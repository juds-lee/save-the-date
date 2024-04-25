import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASS,
    },
});

export default defineEventHandler(async (event) => {
    const body = await readBody(event) 
    try {
        await transporter.sendMail({
            from: body.email,
            to: 'duncanheeney@gmail.com',
            subject: 'New contact form message',
            text: body.text, 
        });
        // Return a success response
        return {
            statusCode: 200,
            body: 'Email sent successfully!',
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Error sending email: ',
        };
    }
});