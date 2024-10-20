const userService = require("../service/userService");

const userController =(req,res)=>{
    userService.createUserService(req,res);
}

const sendOtpController =(req,res)=>{
    userService.sendOtp(req,res);
}

const verifyMobileOtp =(req,res)=>{
    userService.verifyPhoneOtp(req,res);
}
const verifyEmialOtp =(req,res)=>{
    userService.verifyEmailOtp(req,res);
}

module.exports = {userController,sendOtpController,verifyEmialOtp,verifyMobileOtp};