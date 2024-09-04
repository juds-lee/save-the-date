import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import mjml2html from "mjml";
import Handlebars from "handlebars";
import { db } from "../../services/firebaseclient";
import { collection, getDocs } from "firebase/firestore";

const mjmlTemplate = fs.readFileSync("email/index.mjml", "utf8");
const template = Handlebars.compile(mjmlTemplate);

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
type guestData = {
  guestName: string;
  guestEmail: string;
};

export default defineEventHandler(async (event) => {
  try {
    const guestInfoCollectionRef = collection(db, "guestInfoTESTING");
    const querySnapshot = await getDocs(guestInfoCollectionRef);
    const guestList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    for (const guest of guestList) {
      const data: guestData = {
        guestName: guest.name,
        guestEmail: guest.email,
      };
      console.log(data.guestName);
      const mjmlWithDynamicNames = template(data);
      const emailHtmlOutput = mjml2html(mjmlWithDynamicNames).html;
      const body = await readBody(event);
      const emailData = {
        from: body.email,
        to: data.guestEmail,
        subject: "You are Invited to a Wedding!",
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
