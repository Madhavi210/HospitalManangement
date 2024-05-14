import { apiError } from "../helper/apiError";
import { apiResponse } from "../helper/apiResponse";
import { doctorService , patientService, medicalRecordsService} from '../services/index.service'
import express, {Request, Response} from 'express';
import { Doctors , Patients, medicalRecords} from '../models/index.model'


const patientObj = new patientService();

export class patientController {
    getAllPatient = async(req:Request, res:Response) => {
        try {
            const data = await patientObj.getAllPatient(req,res);
            const totalRecord = await Patients.countDocuments();
            const totalPages = Math.ceil(totalRecord / (parseInt(req.query.limit as string) || 10));
            const response = new apiResponse(200,{totalRecord, totalPages, currentPage: parseInt(req.query.page as string) || 1  ,data}, 'patients retrieved successfully');
            res.status(response.statusCode).json( response);
        } catch (error:any) {            
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

    getPatientById = async (req:Request, res:Response) =>{
        try {
            const data = await patientObj.getPatientById(req,res);
            const response = new apiResponse(200,data, 'patient retrieved by id successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }
    
    createPatient = async(req:Request, res:Response) =>{
        try {
            const data = await patientObj.createPatient(req,res);
            const response = new apiResponse(200,data, 'patient created successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            console.log(error);
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }    
    }

    deletePatientById = async(req:Request, res:Response) =>{
        try {
            const data = await patientObj.deletePatientById(req,res);
            const response = new apiResponse(200,data, 'patient deleted successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

    updatePatientById = async(req:Request, res:Response) =>{
        try {
            const data = await patientObj.updatePatientById(req,res);
            const response = new apiResponse(200,data, 'patient updated successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

}
