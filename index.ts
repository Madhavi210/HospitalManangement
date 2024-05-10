import express from 'express'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import { connectDb } from './src/db/db.config';
import { error } from 'console';


const app = express();
const PORT = process.env.PORT || 5000;
// const url = process.env.MONGO_URI || '';

app.use(bodyParser.json())
app.use(express.json())
dotenv.config();


connectDb()
.then(() =>{
    app.listen(PORT, () =>{
        console.log(`server started on port ${PORT}`)
    })
})
.catch((error) =>{
    console.log(`Failed to connect with database,\n ${error}`)
})



