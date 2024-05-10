import mongoose from 'mongoose'
import 'dotenv/config'

let url:string | undefined = process.env.MONGO_URI;

if(!url){
    throw new Error("Connection String Error")
}

export const connectDb = async () =>{
    mongoose.connect(url).then(() =>{
        console.log("connection succes");
        
    }).catch(() =>{
        console.log("Error connecting");
        
    })
}