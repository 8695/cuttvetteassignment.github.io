const JobMeeting = require('../models/meating');
const meetingMail = require('../utils/meetingMail');
const User = require("../models/user");

const jobServices = async (req, res) => {
    try {
        const { job_title, job_description, experience_level, add_candidate, end_date } = req.body;
        console.log(job_title, job_description, experience_level, add_candidate, end_date);

        // Create and save the job meeting
        const job = new JobMeeting({
            jobTitle: job_title,
            jobDescription: job_description,
            experienceLevel: experience_level,
            addCandidate: add_candidate,
            endDate: end_date,
        });
        await job.save();

        // Find users by their email addresses
        const users = [];
        // Use Promise.all to handle asynchronous calls
        const userPromises = add_candidate.map(async (email) => {
            console.log("email", email);
            const user = await User.findOne({ email });
            console.log("user", user);
            if (user) {
                return user;
            } else {
                // Return null if user not found to filter later
                return null;
            }
        });

        // Wait for all promises to resolve
        const foundUsers = await Promise.all(userPromises);
        // Filter out null values
        const validUsers = foundUsers.filter(user => user !== null);

        console.log("validUsers", validUsers);
        if (validUsers.length > 0) {
            // Send emails to found users
            validUsers.forEach(user => {
                meetingMail(user);
            });
            return res.status(201).send({ success: true, message: "Mail sent to candidate(s) successfully" });
        } else {
            return res.status(404).send({ success: false, message: "No candidates found" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "An error occurred", error: error.message });
    }
};

module.exports = { jobServices };
