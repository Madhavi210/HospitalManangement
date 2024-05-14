import express, {Request,Response  } from "express";
import { doctorController , patientController, medicalRecordController} from '../controllers/index.controller'
import { doctorLogin, patientLogin } from '../services/index.service';
import { AuthloginMiddleware } from "../middleware/login.middleware";

const router = express.Router();
const PatientController = new patientController();
const authloginMiddleware = new AuthloginMiddleware();

router.get('/getAll', PatientController.getAllPatient);
router.get('/:patientId',PatientController.getPatientById)
router.post('/post', PatientController.createPatient)
router.delete('/delete/:patientId', authloginMiddleware.isLoggedInPatient, PatientController.deletePatientById)
router.put('/update/:patientId',  authloginMiddleware.isLoggedInPatient, PatientController.updatePatientById);

export default router;

