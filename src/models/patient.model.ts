import mongoose, {Schema, Document} from 'mongoose'

import {ipatient} from '../interface/interfaceData'


const patientSchema:Schema =  new Schema<ipatient>({
    name : {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    mobileNo: {
        type: String,
        required: true,
    },
    diagnosedWith:  {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required : true,
    },
    age : {
        type: Number,
        required: true,
    },
    bloodGroup : {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum : ["M","F","O"],
        required: true,
        lowercase: true,
    },
    token: {
        type: String,
    }
},{timestamps:true});

export const Patients = mongoose.model<ipatient>("Patients", patientSchema)