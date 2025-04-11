import { addDoc, collection, getDocs,query,where } from "firebase/firestore";
import { db } from "../Config/fbconfig";
import { INewMessage } from "../CustomTypes/messageTypes";

export async function getChatHistory(roomId:string){
    const q=query(collection(db,"messages"),where("roomid","==",roomId))
    const snap=await getDocs(q);
    const messages:any[]=[];
    snap.forEach((message)=>{
        const messagedata=message.data();
        const messageid=message.id;
        messagedata["id"]=messageid;
        messages.push(messagedata);
    })
    return messages;
}

export async function addMessageToRoom(payload:INewMessage) {
    const createNewMessage=await addDoc(collection(db,"messages"),payload);
}