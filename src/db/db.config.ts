import mongoose from 'mongoose'
import 'dotenv/config';
import { apiError } from '../helper/apiError';


let url:string | undefined = process.env.MONGO_URI;

if(!url){
    throw new apiError(500, "Please provide mongo url in .env file")
}

export const connectDb = async () =>{
    mongoose.connect(url).then(() =>{
        console.log("connection succes");
        
    }).catch(() =>{
        console.log("Error connecting");
        
    })
}

