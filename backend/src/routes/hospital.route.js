import express from 'express';
const router = express.Router();
import {handleApplyForHospital, handleGetApprovedHospitals,getAllDepartments, bookAppointment,getBookedSlots} from '../controllers/hospital.controller.js';


router.post("/applyForHospital",handleApplyForHospital);
router.get("/getApprovedHospitals",handleGetApprovedHospitals);
router.get("/departments/:hospitalId",getAllDepartments)
router.post('/opd-booking', bookAppointment);
router.get('/booked-slots', getBookedSlots);


export default router;