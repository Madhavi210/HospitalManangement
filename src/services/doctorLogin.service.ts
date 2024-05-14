import { Request, Response } from 'express';
// import { generateToken } from '../utils/jwtUtils';
import { Doctors , Patients, medicalRecords} from '../models/index.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
import { AuthloginMiddleware, } from '../middleware/login.middleware';
dotenv.config();
const jwtSecret: string = process.env.JWT_SECRET || '';

const authloginMiddleware = new AuthloginMiddleware();

export const doctorLogin = async (req: Request, res: Response) => {
    try {
        await authloginMiddleware.doctorExist(req, res, async() =>{
            const { email, password } = req.body;
            const doctor = await Doctors.findOne({ email });
            if (!doctor) return res.status(400).json({ message: 'Invalid Credentials' });
    
            const isMatch = await bcrypt.compare(password, doctor.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });
    
            const idString = doctor._id.toString();
            const token = jwt.sign({ id: idString, role: 'doctor'},jwtSecret, {expiresIn: '1h'});
    
            const updateDoctor = await Doctors.findByIdAndUpdate(
                doctor._id ,
                {$set: {token}},
                {new: true}
            );
            res.status(200).header('auth-token', token).json({ message: "doctor login successfully", updateDoctor });
        })
        
    } catch (error) {
        console.error('Error logging in doctor:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


