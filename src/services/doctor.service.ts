import express from 'express'
import { Doctors } from '../models/doctor.model'
import { Request, Response } from 'express';

export class doctorService { 
    getAllDoctor = async (req:Request, res:Response) =>{
        const data = await Doctors.find();
    }

    getDoctorById = async(req:Request, res:Response) =>{
        const {id} = req.params;
        const data = await Doctors.findById(id)
    }

    createDoctor = async(req:Request, res:Response) =>{
        const data = Doctors.create(req.body);
    }

    deleteDoctorById = async(req:Request, res:Response) =>{
        const {id} = req.params;
        const data = Doctors.findByIdAndDelete(id)
    }

    updateDocrtorById = async(req:Request, res:Response) =>{
        const {id} = req.params;
        const {name, email, password, mobileNo, salary, qualification, experianceInYear} = req.body;
        if (!name || !email || !password || !mobileNo || !salary ) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        const data = Doctors.findByIdAndUpdate(id)
    }
}
