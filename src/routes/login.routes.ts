import { Router } from 'express';
import { AuthloginMiddleware } from '../middleware/login.middleware';
import { doctorLogin, patientLogin } from '../services/index.service';

const router = Router();
const authloginMiddleware = new AuthloginMiddleware();

router.post('/doctor/login', authloginMiddleware.doctorExist , doctorLogin);
router.post('/patient/login',authloginMiddleware.patientExist, patientLogin);



export default router;

