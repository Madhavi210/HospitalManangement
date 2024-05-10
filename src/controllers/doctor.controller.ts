import { apiResponse } from "../helper/apiResponse";
import { errorHandler } from "../helper/errorHandler";
import { doctorService } from "../services/doctor.service";
import { Request, Response } from "express";
const doctorObj = new doctorService();


export class doctorController {
    getAllDoctor = async(req:Request, res:Response) => {
        try {
            const data = await doctorObj.getAllDoctor(req,res);
            const response = new apiResponse(200,data, 'doctors retrieved successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

    getDoctorById = async(req:Request, res:Response) => {
        try {
            const data = await doctorObj.getDoctorById(req,res);
            const response = new apiResponse(200,data, 'doctor retrieved successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

    createDoctor = async(req:Request, res:Response) => {
        try {
            const data = await doctorObj.getAllDoctor(req,res);
            const response = new apiResponse(200,data, 'doctor retrieved successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

    deleteDoctorById = async(req:Request, res:Response) => {
        try {
            const data = await doctorObj.getAllDoctor(req,res);
            const response = new apiResponse(200,data, 'doctor retrieved successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }
    updateDocrtorById = async(req:Request, res:Response) => {
        try {
            const data = await doctorObj.getAllDoctor(req,res);
            const response = new apiResponse(200,data, 'doctor retrieved successfully');
            res.status(response.statusCode).json(response);
        } catch (error:any) {
            const errResponse = new errorHandler(500, 'Internal Server Error', [error.message]);
            res.status(errResponse.statusCode).json(errResponse);
        }
    }

}