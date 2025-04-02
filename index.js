const express= require('express');
const dotenv= require('dotenv');
dotenv.config();
const ConnectDB= require('./database/config/db');
ConnectDB();
const port=process.env.PORT || 3000;
const app= express();
app.use(express.json());
const userRoute= require('./routes/userRoute');
app.use('/user',userRoute);


app.use(express.json());
app.listen(port,()=>{
    console.log("Server is running on port",port);
})