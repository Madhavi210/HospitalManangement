import { Doctors , Patients, medicalRecords} from '../models/index.model'
import { Request, Response } from 'express';
// import {  comparePasswords } from '../utils/bcryptUtils';
// import { generateToken } from '../utils/jwtUtils';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { AuthloginMiddleware, } from '../middleware/login.middleware';
const authloginMiddleware = new AuthloginMiddleware();
dotenv.config();
const jwtSecret: string = process.env.JWT_SECRET || '';

export const patientLogin = async (req: Request, res: Response) => {
    try {
        await authloginMiddleware.patientExist(req, res, async() =>{ 
            const { email, password } = req.body;
            const patient = await Patients.findOne({ email });
            if (!patient) return res.status(400).json({ message: 'Invalid Credentials' });
    
            const isMatch = await bcrypt.compare(password, patient.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });
    
            const idString = patient._id.toString();
            const token = jwt.sign({ id: idString, role: 'patient' }, jwtSecret, {expiresIn: '1h'});
    
            const updatePatient = await Patients.findByIdAndUpdate(
                patient._id,
                {$set: {token}},
                {new: true}
            );
            res.status(200).header('auth-token', token).json({ message:"patient login successfully" , updatePatient });
        });
    } catch (error) {
        console.error('Error logging in patient:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
