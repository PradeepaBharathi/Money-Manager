import express from "express";
import dotenv from "dotenv";
import { config } from 'dotenv';
import cors from "cors";
// const dotenv = require('dotenv');

import { moneyRouter } from "./routes/incomeRoute.js";
import { expenseRouter } from "./routes/expenseRoute.js";
import { user_router } from "./routes/userRoute.js";
import { isAuthenticated } from "./Authentication.js/userAyth.js";
config();
const PORT = 9000;

const app = express();


app.use(express.json())
app.use(cors())
app.use("/user", user_router);
app.use("/moneytracker",isAuthenticated,moneyRouter);
app.use("/expensetracker",isAuthenticated,expenseRouter);



app.get('/',(req,res)=>{
    res.send("looking good")
})

app.listen(PORT,()=>{
    console.log(`listening to localhost ${PORT}`)
})