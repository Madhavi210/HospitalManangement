import exp from 'constants';
import mongoose , {Schema , Document} from 'mongoose'
import { Doctors , Patients} from '../models/index.model'

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

medicalRecordSchema.pre('deleteMany',{ document: true }, async function(this:any, next) {
  try {
      const medicalRecords = mongoose.model<imedicalRecords>("medicalRecords"); // Get the medicalRecords model
      await medicalRecords.deleteMany({ patientId: this._id });
      next();
  } catch (error:any) {
      next(error);
  }
})

export const medicalRecords = mongoose.model<imedicalRecords>("medicalRecords", medicalRecordSchema)
