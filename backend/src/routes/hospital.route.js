import express from 'express';
const router = express.Router();
import {handleApplyForHospital, handleGetApprovedHospitals} from '../controllers/hospital.controller.js';

router.post("/applyForHospital",handleApplyForHospital);
router.get("/getApprovedHospitals",handleGetApprovedHospitals);
export default router;