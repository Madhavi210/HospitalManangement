import { timeStamp } from 'console'
import mongoose, {Schema, Document} from 'mongoose'
import {idoctor} from '../interface/interfaceData'

const doctorSchema:Schema = new Schema<idoctor>({
    name : {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true, 
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    mobileNo :{
        type: String,
        required: true,
        trim: true,
    },
    salary: {
        type: String,
        required: true,
        trim: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    experianceInYear: {
        type: Number,
        default : 0,
    },
    token:{
        type:String,
    }

}, {timestamps: true})

export const Doctors = mongoose.model<idoctor>("Doctors", doctorSchema)
