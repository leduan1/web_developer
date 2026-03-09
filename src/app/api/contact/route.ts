import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { saveContactSubmission } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, phone, countryCode, services, message } = data;

    // Save to Supabase
    await saveContactSubmission({
      name,
      email,
      phone,
      countryCode,
      services,
      message,
    });

    // Send email notification
    await resend.emails.send({
      from: 'Web kontakt <onboarding@resend.dev>',
      to: 'jirka.leanh@gmail.com',
      subject: `Nová zpráva z webu od ${name}`,
      html: `
        <h2>Nová zpráva z kontaktního formuláře</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Jméno</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Telefon</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${countryCode}${phone}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Služby</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${services.join(', ')}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Zpráva</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${message}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
