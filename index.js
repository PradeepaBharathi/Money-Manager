import express from "express";
// import dotenv from "dotenv";
import { config } from 'dotenv';
// const dotenv = require('dotenv');

import { moneyRouter } from "./routes/incomeRoute.js";
import { expenseRouter } from "./routes/expenseRoute.js";

config();
const PORT = 9000;

const app = express();


app.use(express.json())
app.use("/moneytracker",moneyRouter)
app.use("/expensetracker",expenseRouter)


app.get('/',(req,res)=>{
    res.send("looking good")
})

app.listen(PORT,()=>{
    console.log(`listening to localhost ${PORT}`)
})