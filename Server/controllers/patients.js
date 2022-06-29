import mongoose from 'mongoose';
import Patients from '../models/patients.js';

export const getPatients = async (req, res) => {
    try{
        const patients = await Patients.find();
        res.status(200).json(patients);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Some error has occurred '});
    }
}

export const getPatient = async (req, res) => {
    const { id } = req.params;
    try{
        const patient = await Patients.findById(id);
        res.status(200).json(patient);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Some error has occurred '});
    }
}


export const createPatient = async (req, res) => {
    const patient = req.body;
    const newPatient = new Patients(patient);

    try{
        await newPatient.save();
        res.status(200).json(newPatient);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Some error has occurred '});
    }
}

export const deletePatient = async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).json({ message: 'No patient present with this id '});
        }
        await Patients.findByIdAndRemove(id);
        res.status(200).json({ message: 'Patient deleted successfully' });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Some error has occurred '});
    }
}