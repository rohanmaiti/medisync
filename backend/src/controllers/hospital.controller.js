import Hospital from "../models/hospital.model.js";
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

