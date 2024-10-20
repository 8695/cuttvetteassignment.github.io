const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3100
const DATABASE_URL =process.env.DATABASE_URL;



app.use(express.urlencoded({ extended: true })); 
app.use(cors());


app.use(bodyParser.json());



//mongoes connection
 async function main(){
    await mongoose.connect(DATABASE_URL)
 }
 main()
.then(()=>{
    console.log("connection successfully established")
}).catch((err)=>{
    console.log(err);
});



app.listen(PORT,()=>{
    console.log('listening on 3100');
})

app.get('/', (req, res)=>{
    res.send("working fine");
})

//import routes

const userRoutes = require('./routes/routes');

app.use('/',userRoutes);