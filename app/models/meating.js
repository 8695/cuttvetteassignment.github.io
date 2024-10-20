const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    addCandidate: { type: [String], required: true,ref:'User' },
    endDate: { type: Date, required: true },
    
});

const JobMeeting = mongoose.model('JobMeeting', jobSchema);
module.exports = JobMeeting;
