const nodemailer = require("nodemailer");
const otpGenrator = require('otp-generator');

const transporter = nodemailer.createTransport({
   service:'gmail', // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "niranjanmourya20@gmail.com",
        pass: "omto uuzk yuaz yhsh",
    },
});

const generateOtp = () => otpGenrator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

// async..await is not allowed in global scope, must use a wrapper
const Mail = async (email) => {
    const otp = generateOtp();
    try {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: email, // list of receivers
            subject: "Login OTP", // Subject line
            text: "Hi This Mail from Login via OTP", // plain text body
            html: `
            <div>Welcome Jobs App </div>
            <h1>OTP for SignUp</h1>
            <b>Your Otp is ${otp}</b>
            `, // html body
        });

      return otp;
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    catch (error) {
        console.log(error);
    }

}

module.exports = Mail;

