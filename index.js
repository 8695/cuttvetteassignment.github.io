const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
// const User=require('./models/users');

app.use(bodyParser.json());
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }


//mongoes connection
 async function main(){
    await mongoose.connect("mongodb+srv://niranjanmourya000:System123@cluster0.pzm4dcy.mongodb.net/jobsapp")
 }
 main()
.then(()=>{
    console.log("connection successfully established")
}).catch((err)=>{
    console.log(err);
});



app.listen(3100,()=>{
    console.log('listening on 3100');
})

app.get('/', (req, res)=>{
    res.send("working fine");
})

//import routes

const userRoutes = require('./routes/routes');

app.use('/',userRoutes);