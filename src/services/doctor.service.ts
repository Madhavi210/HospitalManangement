import express from 'express'
import { Doctors , Patients, medicalRecords} from '../models/index.model'
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
export class doctorService { 
    getAllDoctor = async (req:Request, res:Response) =>{
        try {
            const data = await Doctors.find();
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


