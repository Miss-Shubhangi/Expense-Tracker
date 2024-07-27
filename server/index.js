import express from 'express'
import mongoose from 'mongoose'
import { postSignup, postLogin } from './controllers/user.js';
import { postTransaction, getTransactions } from "./controllers/transaction.js";
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

const app= express()
app.use(express.json())
app.use(cors())
 
const dbConnection = async ()=>{
    const conn =await mongoose.connect(process.env.MONGO_URL)

if(conn){
    console.log("MongoDB connected 🎁🔗")
}
else{
    console.log("Database not connected ⛓️‍💥❌")
}
}
dbConnection()

app.post("/signup", postSignup)

app.post("/login", postLogin)

app.post("/transaction", postTransaction)

app.get("/transactions", getTransactions)

const PORT=process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`)
})
