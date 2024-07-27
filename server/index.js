import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

const app= express()
app.use(express.json())
app.use(cors())
 
const dbConnection = async ()=>{
    const conn =await mongoose.connect(process.env.MONGO_URI)

if(conn){
    console.log("MongoDB connected 🎁🔗")
}
else{
    console.log("Database not connected ⛓️‍💥❌")
}
}
dbConnection()

app.get('/',(req ,res)=>{
    res.send("Expense tracker server is running .")
})
const PORT=process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`)
})
