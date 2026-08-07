import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { saveContactSubmission } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

// Best-effort in-memory rate limit (per warm serverless instance)
const RATE_LIMIT = 3; // submissions
const RATE_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, phone, countryCode, services, message } = data;
    const { company: honeypot, elapsed } = data;

    // --- Anti-spam gate ---
    // 1) Honeypot: humans never see/fill the "company" field.
    if (honeypot) {
      return NextResponse.json({ success: true }); // silently drop
    }

    // 2) Timing: real users take longer than a few seconds to fill the form.
    //    Fail-closed: a bot POSTing straight to the API won't send a valid
    //    `elapsed`, so a missing/absurd value is treated as spam.
    if (
      typeof elapsed !== 'number' ||
      elapsed < 3000 ||
      elapsed > 2 * 60 * 60 * 1000
    ) {
      return NextResponse.json({ success: true }); // silently drop
    }

    // 3) Required fields + email format
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      name.trim().length < 2 ||
      name.length > 100 ||
      !EMAIL_RE.test(email) ||
      email.length > 150 ||
      message.trim().length < 2 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { success: false, error: 'Neplatný formulář.' },
        { status: 400 }
      );
    }

    // 4) Link flood: spam messages are mostly URLs.
    const linkCount = (message.match(/https?:\/\/|www\./gi) || []).length;
    if (linkCount > 2) {
      return NextResponse.json({ success: true }); // silently drop
    }

    // 5) Rate limit by IP
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Příliš mnoho odeslání. Zkuste to později.' },
        { status: 429 }
      );
    }

    // Save to Supabase (non-blocking - don't let it prevent email)
    try {
      await saveContactSubmission({
        name,
        email,
        phone,
        countryCode,
        services,
        message,
      });
    } catch (dbError) {
      console.error('Supabase save error:', dbError);
    }

    // Send email notification
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'LEDU web <web@ledu.cz>',
      to: ['info@ledu.cz', 'jirka.leanh@gmail.com'],
      replyTo: email,
      subject: `Nová zpráva z webu od ${name}`,
      html: `
        <h2>Nová zpráva z kontaktního formuláře</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Jméno</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${esc(name)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${esc(email)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Telefon</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${esc(countryCode)}${esc(phone)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Služby</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${esc(Array.isArray(services) ? services.join(', ') : '')}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Zpráva</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${esc(message).replace(/\n/g, '<br>')}</td></tr>
        </table>
      `,
    });

    if (emailError) {
      console.error('Resend error:', emailError);
      return NextResponse.json(
        { success: false, error: emailError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
