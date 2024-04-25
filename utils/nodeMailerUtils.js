import dotenv from 'dotenv';
dotenv.config();
import * as nodemailer from 'nodemailer';

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
// export default transporter;

const mailOptions = {
    from: {
        name: 'Judy',
        address: process.env.EMAIL_USER,
    },
    to: "judy_96_@hotmail.com", // list of receivers
    subject: "DUNCAN ITS ME! IM TESTING MY NODE MAILER APP",
    text: "Hello world?!",
    html: "<b>Hello world?</b>",
    // attachments: [ 
    //     {
    //         filename: 'test.pdf',
    //         path: path.join(__dirname, 'test.pdf'),
    //         contentType: 'application/pdf',
    //     },
    // ]
}

const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("email sent")
    }
    catch (err) {
        console.log(err);
    }
};
sendMail(transporter, mailOptions);

