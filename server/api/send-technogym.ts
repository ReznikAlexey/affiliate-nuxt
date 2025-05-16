import { defineEventHandler, readBody } from 'h3'
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, phone, email } = body

  const transporter = nodemailer.createTransport({
    host: 'smtp.yourhost.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your@email.com',
      pass: 'yourpassword'
    }
  })

  await transporter.sendMail({
    from: `"Technogym Form" <your@email.com>`,
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
