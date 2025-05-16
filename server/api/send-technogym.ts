import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: parseInt(config.NUXT_SMTP_PORT),
    secure: config.NUXT_SMTP_PORT === '465', // true for SSL (465), false for TLS (587)
    auth: {
      user: config.NUXT_SMTP_USER,
      pass: config.NUXT_SMTP_PASS
    }
  });

  const mailOptions = {
    from: `"NomadClubShop Form" <${config.NUXT_SMTP_USER}>`,
    to: 'your@email.com', // destination
    subject: 'New Technogym Form Submission',
    html: `
      <h2>Technogym Form Submission</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Message:</strong> ${body.message}</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { status: 'success', messageId: info.messageId };
  } catch (error: any) {
    console.error('Email send error:', error.message);
    return {
      statusCode: 500,
      message: 'Failed to send email',
      error: error.message
    };
  }
});
