import { apiError } from "../helper/apiError";
import { apiResponse } from "../helper/apiResponse";
import { doctorService , patientService, medicalRecordsService} from '../services/index.service'
import express, {Request, Response} from 'express';


const medicalRecordObj = new medicalRecordsService();

export class medicalRecordController {
    getAllRecord = async (req:Request, res:Response) =>{
        try {
            const  data = await medicalRecordObj.getAllRecord(req, res);
            const response = new apiResponse(200,data, 'medical records retrieved successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }
    getRecordById = async (req:Request, res:Response) =>{
        try {
            const data = await medicalRecordObj.getRecordById(req,res);
            const response = new apiResponse(200,data, 'medical record retrieved successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

    createRecordById = async (req:Request, res:Response) =>{
        try {
            const  {patientId, doctorId, addmittedDate, disschargeDate, diagnosis, prescriptions} = req.body;

            // const  {patientId, doctorId, addmittedDate, disschargeDate, prescriptions} = req.body;
            // const requiredFiels = [patientId, doctorId, addmittedDate, disschargeDate, diagnosis,prescriptions]
            // const missingField = requiredFiels.filter(field => !(field in req.body))

            if (!patientId || !doctorId || !addmittedDate || !disschargeDate || !diagnosis  ) {
                return res.status(400).json({ error: 'All fields are required.' });
            }
            const data = await medicalRecordObj.createRecordById(req,res);
            const response = new apiResponse(200,data, 'medical record created successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

    deleteRecordById = async (req:Request, res:Response) =>{
        try {
            const data = await medicalRecordObj.deleteRecordById(req,res);
            const response = new apiResponse(200,data, 'medical record deleted successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

    updateRecordById = async (req:Request, res:Response) =>{
        try {
            const data = await medicalRecordObj.updateRecordById(req,res);
            const response = new apiResponse(200,data, 'medical record updated successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }
    
}






