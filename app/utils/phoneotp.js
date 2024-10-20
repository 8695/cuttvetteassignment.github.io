// const twilio = require('twilio');
const otpGenerator = require('otp-generator')
require('dotenv').config


//const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_AUTH);


const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_SECERT_KEY
})

const generateOtp =()=> otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

const sendOtp = async (phone) => {
    const otp=generateOtp();
    console.log("phone",phone)
    try {
        await vonage.sms.send({
            to: phone,
            from: process.env.VONAGE_PHONE_NUMBER,
            text :`Your E-Shop login OTP is ${otp}`,

        })
        return otp;
        // await client.messages.create({
        //     body: `Your E-Shop login OTP is ${otp}`,
        //     from: process.env.TWILIO_PHONE_NUMBER,
        //     to: phone
        // })
        // return otp;
        
    } catch (error) {
        console.log("error in", error);
       return error;
    }
}

module.exports=sendOtp;