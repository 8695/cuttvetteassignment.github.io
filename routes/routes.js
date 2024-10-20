const express = require("express");
const router = express.Router();
const auth = require('../app/middleware/auth');
const jobController = require('../app/controller/meetingController');


 


const userController = require('../app/controller/userController');



router.route('/userSignUp').post(userController.userController);
router.route('/sendOtp').post(userController.sendOtpController);
router.route('/verifyOtp/email').post(userController.verifyEmialOtp);
router.route('/verifyOtp/phone').post(userController.verifyMobileOtp);
router.route('/sendMeeting').post(jobController.jobController);

module.exports = router;