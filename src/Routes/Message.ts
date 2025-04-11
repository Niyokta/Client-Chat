import express from "express"
import { addMessageToRoom, getChatHistory } from "../Handlers/messageHandler";
import { INewMessage } from "../CustomTypes/messageTypes";


const messageRouter=express.Router();

messageRouter.get("/getChatHistory",async(req,res)=>{
    try{
        const {roomId}=req.query;
        if(roomId===undefined){
            res.send({status:401,message:"Room id undefined"});
            return;
        }
        const messages=await getChatHistory(roomId?.toString());
        res.send({status:200,message:"Messages retrieved successfully",messages:messages});
    }
    catch(err){
        if(err instanceof Error) res.send({status:400,message:err.message})
            else res.send({status:400,message:"Unknown error occured"})
    }
})


messageRouter.post("/addMessageToRoom",async(req,res)=>{
    try{
        const {senderId,receiverId,roomId,text}=req.body;
        const date=new Date();
        const payload:INewMessage={
            senderId:senderId,
            receiverId:receiverId,
            roomid:roomId,
            text:text,
            timeStamp:date.toString()
        }
        const sendMessage=await addMessageToRoom(payload);
        res.send({status:200,message:"Message sent successfully"});
    }
    catch(err){
        if(err instanceof Error) res.send({status:400,message:err.message})
            else res.send({status:400,message:"Unknown error occured"})
    }
})
export {messageRouter}