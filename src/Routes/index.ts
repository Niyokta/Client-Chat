import express from "express"
import { roomRouter } from "./Room";
import { messageRouter } from "./Message";


const mainRouter=express.Router();
mainRouter.use("/room",roomRouter);
mainRouter.use("/message",messageRouter);

export {mainRouter}