const express = require('express');
const app= express();
const cors = require("cors");
const itemRoute = require("./routes/itemRoute");

// .env file is used to store environment variables
const dotenv = require("dotenv");
dotenv.config();
const ConnectDB = require("./database/config/db");
ConnectDB();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/items1", itemRoute);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})