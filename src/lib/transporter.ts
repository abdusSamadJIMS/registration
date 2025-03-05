import nodemailer from 'nodemailer'
const pass = process.env.GMAIL_PASS
const sendFrom = process.env.GMAIL_USER
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: sendFrom,
        pass: pass,
    }
})