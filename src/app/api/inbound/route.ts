import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Receives Resend `email.received` webhooks for *@ledu.cz and forwards
// each incoming email to the personal inbox. Reply-To is set to the
// original sender so replying from Gmail goes straight back to them.

const resend = new Resend(process.env.RESEND_API_KEY);

const FORWARD_TO = process.env.INBOUND_FORWARD_TO || 'jirka.leanh@gmail.com';
const FORWARD_FROM_ADDRESS = 'info@ledu.cz';
const OWN_DOMAIN = '@ledu.cz';

function addressOf(v: string): string {
  const m = v.match(/<([^>]+)>/);
  return (m ? m[1] : v).trim().toLowerCase();
}

function displayNameOf(v: string): string {
  const m = v.match(/^\s*"?([^"<]*?)"?\s*</);
  const name = (m && m[1].trim()) || addressOf(v);
  // Keep the From header well-formed whatever the sender put in their name
  return name.replace(/["<>,;\\]/g, '').slice(0, 60) || 'Neznámý odesílatel';
}

export async function POST(request: NextRequest) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) {
    console.error('Inbound: RESEND_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  const payload = await request.text();

  let event;
  try {
    event = resend.webhooks.verify({
      payload,
      headers: {
        id: request.headers.get('svix-id') ?? '',
        timestamp: request.headers.get('svix-timestamp') ?? '',
        signature: request.headers.get('svix-signature') ?? '',
      },
      webhookSecret: secret,
    });
  } catch (err) {
    console.error('Inbound: invalid webhook signature', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'email.received') {
    return NextResponse.json({ ignored: event.type });
  }

  const { email_id: emailId, from } = event.data;

  // Never re-forward our own outgoing mail (e.g. the contact form copy sent
  // from web@ledu.cz to info@ledu.cz, which already goes to Gmail directly).
  // This also prevents forwarding loops.
  if (addressOf(from).endsWith(OWN_DOMAIN)) {
    return NextResponse.json({ skipped: 'own domain' });
  }

  const { data: email, error: getError } =
    await resend.emails.receiving.get(emailId);
  if (getError || !email) {
    console.error('Inbound: failed to fetch email', emailId, getError);
    // 500 so Resend retries the webhook later
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
  }

  const { data: attachmentList, error: attError } =
    await resend.emails.receiving.attachments.list({ emailId });
  if (attError) {
    console.error('Inbound: failed to list attachments', emailId, attError);
    return NextResponse.json({ error: 'Attachments failed' }, { status: 500 });
  }

  const attachments = (attachmentList?.data ?? []).map((a) => ({
    path: a.download_url,
    filename: a.filename,
    contentType: a.content_type,
    contentId: a.content_disposition === 'inline' ? a.content_id : undefined,
  }));

  const replyTo = email.reply_to?.length ? email.reply_to : [email.from];
  const header = `Přeposláno z ${email.to.join(', ')} · od ${email.from}`;

  const { error: sendError } = await resend.emails.send(
    {
      from: `${displayNameOf(email.from)} via LEDU <${FORWARD_FROM_ADDRESS}>`,
      to: [FORWARD_TO],
      replyTo,
      subject: email.subject || '(bez předmětu)',
      text: `${header}\n\n${email.text ?? ''}`,
      html: email.html
        ? `<p style="color:#888;font-size:12px">${header
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')}</p>${email.html}`
        : undefined,
      attachments: attachments.length ? attachments : undefined,
    },
    // Resend retries webhooks; don't deliver the same email twice.
    { idempotencyKey: `inbound-forward-${emailId}` }
  );

  if (sendError) {
    console.error('Inbound: forward failed', emailId, sendError);
    return NextResponse.json({ error: 'Forward failed' }, { status: 500 });
  }

  return NextResponse.json({ forwarded: emailId });
}
