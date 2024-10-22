import nodemailer from "nodemailer";
import fs from "fs";
import mjml2html from "mjml";
import Handlebars from "handlebars";
import { db } from "../../services/firebaseclient";
import { collection, getDocs } from "firebase/firestore";
import jwt from "jsonwebtoken";

const mjmlTemplate = fs.readFileSync("email/index.mjml", "utf8");
const template = Handlebars.compile(mjmlTemplate);

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASS,
  },
});

type guestData = {
  guestName: string;
  guestEmail: string;
};

export default defineEventHandler(async (event) => {
  try {
    const guestInfoCollectionRef = collection(db, "guestInfoSaveTheDate");
    const querySnapshot = await getDocs(guestInfoCollectionRef);
    const guestList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    for (const guest of guestList) {
      const payload = {
        name: guest.name,
        uuid: guest.id,
      };
      const secretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

      const data: guestData = {
        guestName: guest.name,
        guestEmail: guest.email,
        token: token,
      };
      const mjmlWithDynamicNames = template(data);
      const emailHtmlOutput = mjml2html(mjmlWithDynamicNames).html;
      const emailData = {
        from: '"Judy & Duncan" <judyandduncanwedding@gmail.com>',
        to: data.guestEmail,
        subject: "Save the Date!",
        html: emailHtmlOutput,
      };
      try {
        await transporter.sendMail(emailData);
      } catch (error) {
        console.log("Error sending email: ", error);
      }
    }
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
