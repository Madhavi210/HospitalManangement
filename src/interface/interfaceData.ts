import mongoose from "mongoose"


export interface imedicalRecords{
    patientId: mongoose.Schema.Types.ObjectId,
    doctorId: mongoose.Schema.Types.ObjectId,
    addmittedDate: Date,
    disschargeDate: Date,
    diagnosis: string,
    prescriptions: string[]
}

export interface idoctor {
    name: String,
    email: string,
    password: string,
    mobileNo: string,
    salary: string,
    qualification: string,
    experianceInYear: number ,
    token: string
}

export interface ipatient {
    name: string,
    email: string,
    password: string,
    mobileNo: string,
    diagnosedWith: string,
    address: string,
    age: number,
    bloodGroup: string,
    gender: string,
    token: string,
}
