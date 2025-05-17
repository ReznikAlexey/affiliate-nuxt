import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  console.log("🔧 CONFIG VALUES CHECK:");
  console.log("HOST:", config.smtpHost);
  console.log("PORT:", config.NUXT_SMTP_PORT);
  console.log("USER:", config.NUXT_SMTP_USER);
  console.log("PASS:", config.NUXT_SMTP_PASS ? ' present' : ' missing');

  if (!config.smtpHost || !config.NUXT_SMTP_PORT || !config.NUXT_SMTP_USER || !config.NUXT_SMTP_PASS) {
    return {
      statusCode: 500,
      message: 'Missing SMTP config values'
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: parseInt(config.NUXT_SMTP_PORT),
      secure: config.NUXT_SMTP_PORT === '465',
      auth: {
        user: config.NUXT_SMTP_USER,
        pass: config.NUXT_SMTP_PASS
      }
    });

    const mailOptions = {
      from: `"NomadClubShop Form" <${config.NUXT_SMTP_USER}>`,
      to: 'your@email.com',
      subject: 'New Technogym Form Submission',
      html: `
        <h2>Technogym Form Submission</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(" Email sent:", info.messageId);
    return {
      status: 'success',
      messageId: info.messageId
    };
  } catch (error: any) {
    console.error(" FULL EMAIL ERROR:", error);
    return {
      statusCode: 500,
      message: ' Failed to send email',
      error: error.message,
      code: error.code || null,
      response: error.response || null
    };
  }
});
