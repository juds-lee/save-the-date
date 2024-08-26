import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
// crypto.randomUUID()
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASS,
  },
});

export default defineEventHandler(async (event) => {
  const templatePath = path.resolve("email", `index.html`);
  const templateContent = fs.readFileSync(templatePath, "utf-8");

  const body = await readBody(event);
  try {
    await transporter.sendMail({
      from: body.email,
      to: "judyjungmin.lee@gmail.com",
      subject: "You are Invited to a Wedding!",
      html: templateContent,
    });
    // Return a success response
    return {
      statusCode: 200,
      body: "Email sent successfully!",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Error sending email: ",
    };
  }
});
