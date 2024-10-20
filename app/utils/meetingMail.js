const nodemailer = require("nodemailer");
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
   service:'gmail', // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "niranjanmourya20@gmail.com",
        pass: "omto uuzk yuaz yhsh",
    },
});


function generateRandomLink(length) {
    return crypto.randomBytes(length).toString('hex');
}



// async..await is not allowed in global scope, must use a wrapper
const Mail = async (user) => {
   // Example usage
const randomLink = generateRandomLink(16);
    try {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: user.email, // list of receivers
            subject: "Mail to Job Notification", // Subject line
            text: "Hi Thanks For Apply", // plain text body
            html: `
            <div>Welcome Jobs App </div>w
            <h1>Hi !! ${user.name}Your Join meetting Through this ${randomLink} </h1>
           
            `, // html body
        });

      return randomLink;
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    catch (error) {
        console.log(error);
    }

}

module.exports = Mail;

