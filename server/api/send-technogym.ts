import { defineEventHandler, readBody, useRuntimeConfig } from 'h3'
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { name, phone, email } = body

  const transporter = nodemailer.createTransport({
    host: config.NUXT_SMTP_HOST,
    port: Number(config.NUXT_SMTP_PORT),
    secure: true, // set to true if using port 465
    auth: {
      user: config.NUXT_SMTP_USER,
      pass: config.NUXT_SMTP_PASS
    }
  })

  await transporter.sendMail({
    from: `"Technogym Form" <${config.NUXT_SMTP_USER}>`,
    to: 'technogym@nomadclubshop.com',
    subject: 'New Technogym Inquiry',
    html: `
      <h3>New Technogym Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
    `
  })

  return { status: 'ok' }
})
