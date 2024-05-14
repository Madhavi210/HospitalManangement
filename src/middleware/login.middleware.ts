import {Request , Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
import { Patients, Doctors } from '../models/index.model';
import { nextTick } from 'process';
import bcrypt from 'bcrypt'
import { log } from 'console';
// import { users } from '../models/user.model';
import { idoctor, ipatient } from '../interface/interfaceData';

dotenv.config();
const jwtSecret: string = process.env.JWT_SECRET || '';


export class AuthloginMiddleware {
    isLoggedInDoctor = async(req: Request, res: Response, next: NextFunction) => {
        try {
            let {doctorId} = req.params;
            let validUser:idoctor|null = await Doctors.findOne({_id: doctorId,$expr:{$gt:[{$strLenCP:"$token"},0]}})
 
            console.log(doctorId);
            
            // console.log(validUser);
            
            if(validUser){
                next()
            }else{
                res.json({validUser})
                // res.json({message: "Doctor Not Logged in "})
            }
        } catch (error) {
            console.log(error);
            
            res.status(400).json({ message: 'Invalid Token' , error});
        }
    };

    isLoggedInPatient = async(req: Request, res: Response, next: NextFunction) => {
        try {
            let {patientId} = req.params;
            let validUser:ipatient|null = await Patients.findOne({_id: patientId,$expr: { $gt: [{ $strLenCP: "$token" }, 0]}})
 
            if(validUser){
                next()
            }else{
                res.json({message: "Patient Not Logged in", validUser})
            }
        } catch (error) {
            res.status(400).json({ message: 'Invalid Token' , error});
        }
    };

    doctorExist = async (req:Request, res:Response, next:NextFunction) =>{
        try {
            const {email, password} = req.body;
            // console.log(email);
            
            const  user = await Doctors.findOne({email})
            // console.log(user);
            
            if (!user) {
                return res.status(404).json({ message: "doctor not found" });
            }
            // console.log(password.toString());
            // console.log(user.password);
            
            // console.log(bcrypt.compare(password.toString(),user.password));
            
            
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            console.log(isPasswordCorrect);
            
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            (req as any).user = user;
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }

    patientExist = async (req:Request, res:Response, next:NextFunction) =>{
        try {
            const {email, password} = req.body;
            // console.log(email);
            
            const  user = await Patients.findOne({email})
            // console.log(user);
            
            if (!user) {
                return res.status(404).json({ message: "patient not found" });
            }

            if (typeof password !== 'string') {
                return res.status(400).json({ message: "Invalid password format" });
            }
            // console.log(bcrypt.compare(password.toString(),user.password));
            // console.log(password);
            // console.log(user.password);
            
            
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            console.log(isPasswordCorrect);
            
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            (req as any).user = user;
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" , error});
        }
    }
 }

