import express, {Request,Response  } from "express";
import { doctorController , patientController, medicalRecordController} from '../controllers/index.controller'
import { doctorLogin, patientLogin } from '../services/index.service';
import { AuthloginMiddleware } from "../middleware/login.middleware";
import { run } from "node:test";

const router = express.Router();
const MedicalRecordController = new medicalRecordController();
const authloginMiddleware = new AuthloginMiddleware();

router.get('/:doctorId/getAll',authloginMiddleware.isLoggedInDoctor, MedicalRecordController.getAllRecord)
router.get('/:id', MedicalRecordController.getRecordById)
router.post('/:doctorId/post',authloginMiddleware.isLoggedInDoctor, MedicalRecordController.createRecordById)
router.delete('/:doctorId/delete/:id',authloginMiddleware.isLoggedInDoctor,  MedicalRecordController.deleteRecordById)
router.put('/:doctorId/update/:id',authloginMiddleware.isLoggedInDoctor, MedicalRecordController.updateRecordById);
// router.put('/update/:id', MedicalRecordController.updateRecordById);

export default router;


