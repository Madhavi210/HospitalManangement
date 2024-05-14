import { doctorService , patientService, medicalRecordsService} from '../services/index.service'
import { apiResponse } from "../helper/apiResponse";
import { apiError } from "../helper/apiError";
import { Request, Response } from "express";
import { Doctors , Patients, medicalRecords} from '../models/index.model'


const doctorObj = new doctorService();
export class doctorController {
    getAllDoctor = async(req:Request, res:Response) => {
        try {
            const data = await doctorObj.getAllDoctor(req,res);
            const totalRecord = await Doctors.countDocuments();
            const totalPages = Math.ceil(totalRecord / (parseInt(req.query.limit as string) || 10));
            const response = new apiResponse(200,{totalRecord, totalPages, currentPage: parseInt(req.query.page as string) || 1  ,data}, 'doctors retrieved successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

    getDoctorById = async(req:Request, res:Response) => {
        try {
            const data = await doctorObj.getDoctorById(req,res);
            const response = new apiResponse(200,data, 'doctor retrieved by id successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

    createDoctor = async(req:Request, res:Response) => {
        try {
            const data = await doctorObj.createDoctor(req,res);
            const response = new apiResponse(200,data, 'doctor created successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

    deleteDoctorById = async(req:Request, res:Response) => {
        try {
            const data = await doctorObj.deleteDoctorById(req,res);
            const response = new apiResponse(200,data, 'doctor deleted successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }
    updateDocrtorById = async(req:Request, res:Response) => {
        try {
            const data = await doctorObj.updateDocrtorById(req,res);
            const response = new apiResponse(200,data, 'doctor updated successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

}