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

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   requireTLS: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.APP_PASS,
//   },
//   from: "judyandduncanwedding@gmail.com",
// });

// type guestData = {
//   guestName: string;
//   guestEmail: string;
//   token: string;
// };

// export default defineEventHandler(async (event) => {
//   try {
//     const guestInfoCollectionRef = collection(db, "guestInfoTesting");
//     const querySnapshot = await getDocs(guestInfoCollectionRef);
//     const guestList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as GuestInfo) }));
//     // loop thru the first 50 of guestList and send email
//     // .slice(51, 105
//     // send it to the guest with the name Brad
//     const guest = guestList.find((guest) => guest.name === "Test");
//     const payload = {
//       name: guest?.name,
//       uuid: guest?.id,
//     };
//     console.log("payload", payload);
//     // for (const guest of guestList) {
//     //   const payload = {
//     //     name: guest.name,
//     //     uuid: guest.id,
//     //   };
//     const config = useRuntimeConfig();
//     const secretKey = config.jwtSecretKey;
//     const token = jwt.sign(payload, secretKey);
//     // const capitalize = (name: string) => {
//     //   return name
//     //     .split(" ")
//     //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     //     .join(" ");
//     // };
//     const data: guestData = {
//       guestEmail: guest.email,
//       token: token,
//       guestName: guest.hasPlusOne ? `${guest.name} and ${guest.secondaryGuest.secondaryName}` : guest.name,
//     };
//     console.log("data", data);
//     const mjmlWithDynamicNames = template(data);
//     const emailHtmlOutput = mjml2html(mjmlWithDynamicNames).html;
//     const emailData = {
//       from: '"Judy & Duncan" <judyandduncanwedding@gmail.com>',
//       to: data.guestEmail,
//       subject: "Welcome to Judy & Duncan's Wedding!",
//       html: emailHtmlOutput,
//     };
//     try {
//       await transporter.sendMail(emailData);
//     } catch (error) {
//       console.log("Error sending email: ", error);
//     }
//     // }
//     return {
//       statusCode: 200,
//       body: "Email sent successfully!",
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: "Error sending email: ",
//     };
//   }
// });

export default defineEventHandler(async (event) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    const msg = {
      to: "judyjungmin.lee@gmail.com",
      from: "Judy and Duncan <judy@judyandduncan.com>",
      subject: "Welcome to Judy and Duncan's Wedding!",
      text: "We can't wait to see you at our wedding!",
      html: "Dear Judy, <br> We can't wait to see you at our wedding! <br> Sincerely, <br> Judy and Duncan",
    };

    await sgMail.send(msg);
    console.log("Email sent successfully!");
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
