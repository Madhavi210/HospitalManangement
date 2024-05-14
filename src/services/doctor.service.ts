import express from 'express'
import { Doctors , Patients, medicalRecords} from '../models/index.model'
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
export class doctorService { 
    getAllDoctor = async (req:Request, res:Response) =>{
        try {
            // const data = await Doctors.find();
            const page = parseInt(req.query.page as string) || 1; // default page 1
            const limit = parseInt(req.query.limit as string) || 10; // default limit 10
            const skip = Math.max(page - 1, 0) * limit; 

            const searchQuery: any = {};
            if (req.query.search) {
                const searchValue = req.query.search as string;
                searchQuery.$or = [
                    { doctorId: searchValue },
                    { name: {$regex:searchValue , $options: 'i'} },
                    { email: {$regex:searchValue , $options: 'i'} },
                    { mobileNo: {$regex:searchValue , $options: 'i'} },
                    { qualification: {$regex:searchValue , $options: 'i'} },
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

            const data = await medicalRecords.aggregate(pipeline).exec();

            return data;
        } catch (error:any) {
            throw new Error(error.message); 
        }
    }

    getDoctorById = async(req:Request, res:Response) =>{
       try {
            const {id} = req.params;
            const data = await Doctors.findById(id);
            return data;
       } catch (error:any) {
            throw new Error(error.message); 
       }
    }

    createDoctor = async(req:Request, res:Response) =>{
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10) ;
            const data = await Doctors.create({...req.body, password:hashedPassword});
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    deleteDoctorById = async(req:Request, res:Response) =>{
        try {
            const {doctorId} = req.params;
            const data =  await Doctors.findByIdAndDelete(doctorId);
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    updateDocrtorById = async(req:Request, res:Response) =>{
        try {
            const {doctorId} = req.params;
            const {name, email, password, mobileNo, salary, qualification, experianceInYear} = req.body;
            if (!name || !email || !password || !mobileNo || !salary || !qualification ) {
                return res.status(400).json({ error: 'All fields are required.' });
            }
            const data = await Doctors.findByIdAndUpdate(doctorId,
                {
                    name, email, password, mobileNo, salary, qualification, experianceInYear
                },
                {new:true});
            if (!data) {
                return res.status(404).json({ error: 'doctor not found' });
            }
            return data;
        } catch (error:any) {
            throw new Error(error.message);
        }
    }
}


