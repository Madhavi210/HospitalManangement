// index service  in all the folder

import { doctorService } from "./doctor.service";
import { doctorLogin } from "./doctorLogin.service";
import { medicalRecordsService } from "./medicalRecord.service";
import { patientService } from "./patient.service";
import { patientLogin } from "./patientLogin.service";


export{
    doctorService, patientService, medicalRecordsService, doctorLogin, patientLogin
}
