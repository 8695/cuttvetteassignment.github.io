const jobService = require("../service/jobMeeting");

const jobController =(req,res)=>{
    jobService.jobServices(req,res);
}

module.exports = {jobController};