import nodemailer from "nodemailer";

const hasSmtpConfig = () =>
  process.env.SMTP_HOST &&
  process.env.SMTP_PORT &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS &&
  process.env.CONTACT_RECEIVER_EMAIL;

const buildAdminNotificationHtml = ({ name, email, message }) => `
  <div style="margin:0;padding:24px;background:#f4f7ff;font-family:Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dbe3f3;border-radius:14px;overflow:hidden;">
      <tr>
        <td style="padding:18px 22px;background:linear-gradient(120deg,#4f46e5,#2563eb);color:#ffffff;">
          <h2 style="margin:0;font-size:20px;line-height:1.3;">New Portfolio Contact Message</h2>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 22px;">
          <p style="margin:0 0 10px 0;font-size:14px;"><strong>Name:</strong> ${name}</p>
          <p style="margin:0 0 10px 0;font-size:14px;"><strong>Email:</strong> <a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a></p>
          <div style="margin-top:14px;padding:14px;border:1px solid #dbe3f3;border-radius:10px;background:#f8fbff;">
            <p style="margin:0;font-size:14px;line-height:1.7;white-space:pre-wrap;">${message}</p>
          </div>
        </td>
      </tr>
    </table>
  </div>
`;

const buildContactReplyHtml = (name) => `
  <div style="margin:0;padding:24px;background:#f4f7ff;font-family:Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dbe3f3;border-radius:14px;overflow:hidden;">
      <tr>
        <td style="padding:18px 22px;background:linear-gradient(120deg,#4f46e5,#2563eb);color:#ffffff;">
          <h2 style="margin:0;font-size:20px;line-height:1.3;">Thank You For Reaching Out</h2>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 22px;">
          <p style="margin:0 0 14px 0;font-size:14px;line-height:1.7;">Hai ${name},</p>
          <p style="margin:0 0 12px 0;font-size:14px;line-height:1.7;">
            Thank you for reaching out through my portfolio.
          </p>
          <p style="margin:0 0 12px 0;font-size:14px;line-height:1.7;">
            I have received your message and will review it carefully. I will get back to you as soon as possible.
          </p>
          <p style="margin:0 0 14px 0;font-size:14px;line-height:1.7;">
            In the meantime, if your inquiry is urgent, please feel free to reply directly to this email.
          </p>
          <p style="margin:0;font-size:14px;line-height:1.7;">
            Best regards,<br />
            <strong>Krishnaraj</strong>
          </p>
        </td>
      </tr>
    </table>
  </div>
`;

export const sendContactNotification = async ({ name, email, message }) => {
  if (!hasSmtpConfig()) {
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: buildAdminNotificationHtml({ name, email, message })
  });

  await transporter.sendMail({
    from: `"Krishnaraj" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Thank you for contacting me",
    text: `Hai ${name},

Thank you for reaching out through my portfolio.

I have received your message and will review it carefully. I will get back to you as soon as possible.

In the meantime, if your inquiry is urgent, please feel free to reply directly to this email.

Best regards,
Krishnaraj`,
    html: buildContactReplyHtml(name)
  });

  return { skipped: false };
};
