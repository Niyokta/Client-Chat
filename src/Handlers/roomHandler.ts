import { db } from "../Config/fbconfig";
import { INewRoom } from "../CustomTypes/roomTypes";
import { collection, addDoc, getDoc, getDocs, where, query, or } from "firebase/firestore"; 

export async function createRoom(payload:INewRoom){

    const newRoom=await addDoc(collection(db,"rooms"),{
        roomname:payload.roomName || null,
        clientname:payload.clientName || null,
        clientid:payload.clientId || null,
        freelancername:payload.freelancerName || null,
        freelancerid:payload.freelancerId || null
    })
}

export async function findRoomForAUser(userid:Number){

    const q=query(collection(db,"rooms"),or(
        where('freelancerid',"==",userid),
        where("clientid","==",userid)
    ));
    const snap=await getDocs(q)
    const rooms:any[]=[];
    snap.forEach((room)=>{
        const docdata=room.data();
        const roomid=room.id;
        docdata["roomId"]=roomid
        rooms.push(docdata)
    })
    return rooms;
}