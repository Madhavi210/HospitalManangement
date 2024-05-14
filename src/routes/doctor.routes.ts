import { doctorController , patientController, medicalRecordController} from '../controllers/index.controller'
import express, {Request,Response  } from "express";
import { doctorLogin, patientLogin } from '../services/index.service';
import { AuthloginMiddleware } from "../middleware/login.middleware";

const router = express.Router();
const DoctorController = new doctorController();
const authloginMiddleware = new AuthloginMiddleware();


router.get('/getAll', DoctorController.getAllDoctor);
router.get('/:id',DoctorController.getDoctorById)
router.post('/post', DoctorController.createDoctor)
router.delete('/delete/:doctorId',authloginMiddleware.isLoggedInDoctor,  DoctorController.deleteDoctorById)
router.put('/update/:doctorId', authloginMiddleware.isLoggedInDoctor, DoctorController.updateDocrtorById);

export default router;

