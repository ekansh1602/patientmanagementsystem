import mongoose from 'mongoose';

const patientSchema = mongoose.Schema({ 
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
});

const Patient = mongoose.model('PATIENT MODEL', patientSchema);
export default Patient;