import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  const transporter = nodemailer.createTransport({
    host: config.NUXT_SMTP_HOST,
    port: parseInt(config.NUXT_SMTP_PORT),
    secure: true, // true for 465, false for 587
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });

  const mailOptions = {
    from: `"Nomad Club Shop" <${config.NUXT_SMTP_USER}>`,
    to: 'kahennefer@gmail.com', // your destination email
    subject: 'New Technogym Submission',
    html: `
      <h2>Technogym Form Submission</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Message:</strong><br/>${body.message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { status: 'success' };
  } catch (err) {
    console.error('Email send error:', err);
    return { status: 'error', message: 'Email could not be sent' };
  }
});
