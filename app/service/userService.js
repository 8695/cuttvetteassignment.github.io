const User = require('../models/user');
const mobileOtp = require('../utils/phoneotp');
const mailOtp = require('../utils/mail');
const jwt = require('jsonwebtoken');

// Store OTPs temporarily for verification

const sendOtp = async (req, res) => {
    const { phone, email } = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ phone }, { email }] });
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "Phone number or email does not exist" });
        }

        // Initialize an object to hold the OTPs
      

        // Send OTP for phone
        const phoneOtp = await mobileOtp(phone);
        
        console.log("Phone OTP is", phoneOtp);
        await User.updateOne({ phone }, { phoneOtp });
       

        // Send OTP for email
        const emailOtp = await mailOtp(email);
        console.log("Email OTP is", emailOtp);
        await User.updateOne({ email }, { mailOtp:emailOtp });
       

        // Return the success response with both OTPs
        return res.status(200).json({ message: 'OTPs sent phone and eamil',emailOtp,phoneOtp});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error sending OTPs" });
    }
};


const verifyEmailOtp = async (req, res) => {
    const { email, otp } = req.body;
    console.log(email)

    try{
        const user = await User.findOne({ email });
        console.log(user,"user");
        
        if ( !otp) {
            return res.status(400).json({ success: false, message: "OTPs not found for verification" });
        }
    
        const emailOtpValid = user.mailOtp == otp ;
        console.log(emailOtpValid,"emailOtpValid",user.mailOtp);
        
         if(emailOtpValid){
        
        return res.status(200).json({ message: "email otp is verified",emailVerified:true});
         }
         else {
            return res.status(400).json({ success: false, message: "Invalid Email OTP" });
        }
    }catch(error){
        console.log(error)
    }

};


const verifyPhoneOtp = async (req, res) => {
    const { phone ,otp } = req.body;
   try{
    const user = await User.findOne({ phone });
    if (!otp) {
        return res.status(400).json({ success: false, message: "OTPs not found for verification" });
    }

    const phoneOtpValid = user.phoneOtp == otp ;
    if(phoneOtpValid){
       
        return res.status(200).json({ phoneVerified:true, message: "Phone otp is verified" });
    }
     else {
        return res.status(400).json({ success: false, message: "Invalid Phone OTP" });
    }
   }catch(error){
    console.log(error)
   }
};
const createUserService = async (req, res) => {
    const { name, companyName, email, companySize, phone } = req.body;

    // Validate input fields
    if (!name || !companyName || !email || !companySize || !phone) {
        return res.status(400).send("Please enter all required details.");
    }

    // Check for existing user
    const exist = await User.findOne({ $or: [{ email }, { phone }] });
    if (exist) {
        return res.status(422).send({
            success: false,
            message: 'User with this email or phone number already exists'
        });
    }

    // Create the user
    const user = new User({
        name,
        companyName,
        email,
        companySize,
        phone,
    });

    try {
        await user.save();

        // Generate a token for the user
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        
        console.log(user);
        return res.status(201).send({
            success: true,
            message: "User created successfully",
            token,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { sendOtp,verifyEmailOtp, verifyPhoneOtp, createUserService };
