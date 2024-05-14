import express from 'express'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import { connectDb } from './src/db/db.config';
import { error } from 'console';
import {doctorRouter, patientRouter, medicalRecordRouter, loginRouter} from './src/routes/index.routes'


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static("./public"))
dotenv.config();

//routes

app.use('/api/doctor',doctorRouter);
app.use('/api/patient', patientRouter);
app.use('/api/medicalrecord', medicalRecordRouter);
app.use('/api', loginRouter)

connectDb()
.then(() =>{
    app.listen(PORT, () =>{
        console.log(`server started on port ${PORT}`)
    })
})
.catch((error) =>{
    console.log(`Failed to connect with database,\n ${error}`)
})



