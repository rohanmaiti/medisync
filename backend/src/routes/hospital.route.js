import express from 'express';
const router = express.Router();
import {handleApplyForHospital, handleGetApprovedHospitals,getAllDepartments} from '../controllers/hospital.controller.js';

router.post("/applyForHospital",handleApplyForHospital);
router.get("/getApprovedHospitals",handleGetApprovedHospitals);
router.get("/departments/:hospitalId",getAllDepartments)

export default router;