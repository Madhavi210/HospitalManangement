import exp from 'constants';
import mongoose , {Schema , Document} from 'mongoose'

import {imedicalRecords} from '../interface/interfaceData'

const medicalRecordSchema:Schema = new Schema<imedicalRecords>({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patients",
        required: true
      },
      doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctors",
        required: true
      },
      addmittedDate: {
        type: Date,
        required: true,
        default: Date.now,
      },
      disschargeDate: {
        type: Date,
        required: true,
      },
      diagnosis: {
        type: String,
        required: true
      },
      prescriptions: [{
        type: String
      }],
},{timestamps: true});

export const medicalRecords = mongoose.model<imedicalRecords>("medicalRecords", medicalRecordSchema)
