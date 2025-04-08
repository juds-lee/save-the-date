import nodemailer from "nodemailer";
import fs from "fs";
import mjml2html from "mjml";
import Handlebars from "handlebars";
import { db } from "../../services/firebaseclient";
import { collection, getDocs } from "firebase/firestore";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
const mjmlTemplate = fs.readFileSync("email/index.mjml", "utf8");
const template = Handlebars.compile(mjmlTemplate);

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASS,
  },
  from: "judyandduncanwedding@gmail.com",
});

type GuestData = {
  guestName: string;
  guestEmail: string;
  token: string;
};

export default defineEventHandler(async (event) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

    const guestInfoCollectionRef = collection(db, "guestInfoTesting");
    const querySnapshot = await getDocs(guestInfoCollectionRef);
    const guestList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as GuestInfo) }));
    const guest = guestList.find((guest) => guest.name === "Sophia Tran");
    // for (const guest of guestList.slice(90, 93)) {
    const payload = {
      name: guest?.name,
      uuid: guest?.id,
    };
    console.log(guest);
    const config = useRuntimeConfig();
    const secretKey = config.jwtSecretKey;
    const token = jwt.sign(payload, secretKey);

    const data: GuestData = {
      guestEmail: guest?.email as string,
      token: token,
      guestName: guest?.hasPlusOne ? `${guest.name} and ${guest.secondaryGuest.secondaryName}` : guest.name,
    };

    const mjmlWithDynamicNames = template(data);
    const emailHtmlOutput = mjml2html(mjmlWithDynamicNames).html;

    const emailData = {
      to: data.guestEmail,
      from: "Judy and Duncan <judy@judyandduncan.com>",
      subject: "Welcome to Judy & Duncan's Wedding!",
      html: emailHtmlOutput,
    };
    // await sgMail.send(emailData);
    console.log(data.guestName, emailData.to, data.token);
    // }
    return {
      statusCode: 200,
      body: "Email sent successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "Error sending email",
    };
  }
});
