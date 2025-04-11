import express from "express"
import { INewRoom } from "../CustomTypes/roomTypes";
import { createRoom, findRoomForAUser } from "../Handlers/roomHandler";


const roomRouter = express.Router();

roomRouter.get("/getroom", (req, res) => {
    res.send("This is room router")
})

roomRouter.post("/createRoom", async (req, res) => {
    try {
        const { roomName, clientName, freelancerName, clientId, freelancerId } = req.body;
        const payload: INewRoom = {
            roomName: roomName,
            clientName: clientName,
            clientId: clientId,
            freelancerName: freelancerName,
            freelancerId: freelancerId
        }
        console.log("payload : ", payload)
        await createRoom(payload);
        res.send({
            status: 200,
            message: "Room created successfully!"
        })
    }
    catch (err) {
        if (err instanceof Error) res.send({
            status: 400,
            message: err.message,
            err: err
        })
        else res.send({
            status: 400,
            message: "Unknown Error occured",
            err: err
        })
    }
})

roomRouter.get("/getRoomForUser", async(req, res) => {
    try {
        const { userId } = req.query;
        const docs =await findRoomForAUser(Number(userId));
        res.send({
            status: 200,
            message: "These are the rooms",
            doc: docs
        })
    }
    catch (err) {
        if (err instanceof Error) res.send({
            status: 400,
            message: err.message,
            err: err
        })
        else res.send({
            status: 400,
            message: "Unknown Error occured",
            err: err
        })
    }
})

export { roomRouter }