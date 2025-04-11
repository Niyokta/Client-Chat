import express from "express";
import cors from "cors";
import { mainRouter } from "./Routes";
import dotenv from "dotenv"
dotenv.config()
const app=express();
const PORT=process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use("/api/v1",mainRouter)
app.listen(PORT,()=>{
    console.log(" running on port ",PORT)
})