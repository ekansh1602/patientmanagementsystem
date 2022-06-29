import express from 'express';
import { getPatients, getPatient, createPatient, deletePatient } from '../controllers/patients.js';

const router = express.Router();

router.get('/', getPatients);

router.get('/:id', getPatient);

router.post('/', createPatient);

router.delete('/:id', deletePatient);

export default router;