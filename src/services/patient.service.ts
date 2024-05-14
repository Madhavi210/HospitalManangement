import express, { Request, Response } from "express";
import { Doctors , Patients, medicalRecords} from '../models/index.model'
import { apiError } from "../helper/apiError";
import { apiResponse } from "../helper/apiResponse";
import bcrypt from 'bcrypt'

export class patientService{
    getAllPatient = async (req:Request, res:Response) =>{
        try {
            // const data = await Patients.find();
            // Pagination
            const page = parseInt(req.query.page as string) || 1; // default page 1
            const limit = parseInt(req.query.limit as string) || 10; // default limit 10
            const skip = Math.max(page - 1, 0) * limit; 

             // Searching
            const searchQuery: any = {};
            if (req.query.search) {
                const searchValue = req.query.search as string;
                searchQuery.$or = [
                    { patientId: searchValue },
                    { name: { $regex: searchValue, $options: 'i' } },
                    { email: { $regex: searchValue, $options: 'i' } }, 
                    { diagnosedWith: { $regex: searchValue, $options: 'i' } },
                    { gender: { $regex: searchValue, $options: 'i' } },
                    { bloodGroup: { $regex: searchValue, $options: 'i' } },
                    { age: { $regex: searchValue, $options: 'i' } },
                    { mobileNo: { $regex: searchValue, $options: 'i' } }
                ];
            }
             // Filtering
            const filter = { ...searchQuery }; // Add more filters as needed
        
            // Sorting
            const sort = req.query.sort ? JSON.parse(req.query.sort as string) : { createdAt: -1 }; // default sorting by createdAt descending

            // Aggregation pipeline
            const pipeline = [
                { $match: filter },
                { $skip: skip },
                { $limit: limit },
                { $sort: sort },
            ];
            console.log(pipeline);
            
            const data = await medicalRecords.aggregate(pipeline).exec();
            console.log(data);
            return data; // Return the data fetched from the database
        } catch (error: any) {
            throw new Error(error.message); // Throw error to be caught by the controller
        }
    }

    getPatientById = async (req:Request, res:Response) =>{
        try {
            const {patientId} = req.params;
            const data = await Patients.findById(patientId);
            if (!data) {
                const errResponse = new apiError(404, 'Not Found', ['Patient not found']);
                return res.status(errResponse.statusCode).json(errResponse);
            }
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }


    createPatient = async(req:Request, res:Response) =>{
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10) ;
            const data = await Patients.create({...req.body, password:hashedPassword});
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    deletePatientById = async(req:Request, res:Response) =>{
        try {
            const {patientId} = req.params;
            const data = await Patients.findByIdAndDelete(patientId);
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    updatePatientById = async(req:Request, res:Response) =>{
        try {
            const {patientId} = req.params;
            const {name, email, password, mobileNo,diagnosedWith, address , age, bloodGroup, gender} = req.body;
            if (!name || !email || !password || !mobileNo || !diagnosedWith || !address || !age || !bloodGroup || !gender ) {
                return res.status(400).json({ error: 'All fields are required.' });
            }
            const updatedData = await Patients.findByIdAndUpdate(patientId, 
                {name,email, password, mobileNo, diagnosedWith, address, age, bloodGroup, gender} , 
                {new: true});
            if (!updatedData) {
                return res.status(404).json({ error: 'Patient not found' });
            }
            return updatedData;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
      
}

