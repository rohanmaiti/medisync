import Hospital from "../models/hospital.model.js";
import Department from "../models/department.model.js"
export async function handleApplyForHospital(req,res){
try {
    console.log("Request body:", req.body);
} catch (error) {
    
}
}

export async function handleGetApprovedHospitals(req,res){
    console.log("Fetching approved hospitals...");
    try {
        const hospitals = await Hospital.find({approve_status:true});
        const result = hospitals.map(hospital => {
            return {hospital_name:hospital.hospital_name, hospital_id:hospital._id};
        })
        res.status(200).json(hospitals);
    } catch (error) {
        res.status(500).json({message: "Error fetching hospitals"});
    }
}
export async function getAllDepartments(req,res){
    console.log("get all department");
    try {
        const hospitalId = req.params.hospitalId;
        console.log("id is"+hospitalId)
      if (!hospitalId) {
        return res.status(400).json({ message: 'hospitalId is required' });
      }
  
      const departments = await Department.find({ hospital: hospitalId });
      console.log(departments);
      res.status(200).json(departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
