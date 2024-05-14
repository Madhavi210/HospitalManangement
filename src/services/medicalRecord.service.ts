import express, {Request, Response } from 'express';
import { Doctors , Patients, medicalRecords} from '../models/index.model'
// import  {RequestQuery} from 'express-serve-static-core';

export class medicalRecordsService {
    getAllRecord = async(req:Request, res:Response)=>{
        try {
            // Pagination
            const page = parseInt(req.query.page as string) || 1; // default page 1
            const limit = parseInt(req.query.limit as string) || 10; // default limit 10
            const skip = Math.max(page - 1, 0) * limit; 

             // Searching
            const searchQuery: any = {};
            if (req.query.search) {
                const searchValue = req.query.search as string;
                searchQuery.$or = [
                    { doctorId: searchValue },
                    { patientId: searchValue },
                    { _id: searchValue },
                    { diagnosis: { $regex: searchValue, $options: 'i' } }, // Case-insensitive regex search
                    { 'patient.diagnosedWith': { $regex: searchValue, $options: 'i' } },
                    { 'patient.email': { $regex: searchValue, $options: 'i' } },
                    { 'patient.name': { $regex: searchValue, $options: 'i' } },
                    { 'doctor.email': { $regex: searchValue, $options: 'i' } },
                    { 'doctor.name': { $regex: searchValue, $options: 'i' } }
                ];
            }
             // Filtering
            const filter = { ...searchQuery }; // Add more filters as needed
        
            // Sorting
            const sort = req.query.sort ? JSON.parse(req.query.sort as string) : { createdAt: -1 }; // default sorting by createdAt descending

            // Aggregation pipeline
            const pipeline = [
                { $lookup: { from: "patients", localField: "patientId", foreignField: "_id", as: "patient" } },
                { $lookup: { from: "doctors", localField: "doctorId", foreignField: "_id", as: "doctor" } },
                { $match: filter },
                { $skip: skip },
                { $limit: limit },
                { $sort: sort },
                // { $unwind: "$patient" },
                // { $unwind: "$doctor" }
            ];
            console.log(pipeline);
            
            const data = await medicalRecords.aggregate(pipeline).exec();
            console.log(data);
            
            const populatedData = await medicalRecords.populate(data, { path: 'patientId', select: 'diagnosedWith' });

            // const data = await medicalRecords.find().populate({path:"patientId"})
            return populatedData;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    getRecordById = async(req:Request, res:Response) =>{
        try {
            const {id} = req.params;
            const data = await medicalRecords.findById(id).populate({path: "patientId"})
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    createRecordById = async (req:Request, res:Response) =>{
        try {
            const data = await medicalRecords.create(req.body);
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    deleteRecordById  = async (req:Request, res:Response) =>{
        try {
            const {id} = req.params;            
            const data = await medicalRecords.findByIdAndDelete(id).populate({path: "patientId"})            
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    updateRecordById = async (req:Request, res:Response) => {
        try {
            const {id} = req.params;            
            const  {patientId, doctorId, addmittedDate, disschargeDate, diagnosis, prescriptions} = req.body;
            if (!patientId || !doctorId || !addmittedDate || !disschargeDate || !diagnosis  ) {
                return res.status(400).json({ error: 'All fields are required.' });
            }
            const data = await medicalRecords.findByIdAndUpdate(id,
                {patientId, doctorId, addmittedDate, disschargeDate, diagnosis, prescriptions},
                {new: true}
            )  
            if (!data) {
                return res.status(404).json({ error: 'medical record not found' });
            }
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
}

