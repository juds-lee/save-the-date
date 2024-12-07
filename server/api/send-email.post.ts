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
  token: string;
};

export default defineEventHandler(async (event) => {
  try {
    const guestInfoCollectionRef = collection(db, "guestInfoTesting");
    const querySnapshot = await getDocs(guestInfoCollectionRef);
    const guestList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as GuestInfo) }));
    // loop thru the first 50 of guestList and send email
    // .slice(51, 105
    for (const guest of guestList) {
      const payload = {
        name: guest.name,
        uuid: guest.id,
      };
      const config = useRuntimeConfig();
      const secretKey = config.jwtSecretKey;
      const token = jwt.sign(payload, secretKey);
      // const capitalize = (name: string) => {
      //   return name
      //     .split(" ")
      //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      //     .join(" ");
      // };
      const data: guestData = {
        guestEmail: guest.email,
        token: token,
        guestName: guest.hasPlusOne ? `${guest.name} and ${guest.secondaryGuest.secondaryName}` : guest.name,
      };
      console.log("data: ", data);
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
