const User = require("../models/user.model.js");
async function protectedRoute(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    if(!decoded){
    return res.status(401).json({ message: "Unauthorized" });
    }
    // else if authorised then check in db
    // it will give me the payload
    // now validate the user using the payload ie id
    const user = await User.findOne({_id:decoded.id}).select("-password");
    if(!user){
    return res.status(401).json({ message: "Unauthorized" });
    }
    // else 
    // means authorised user , so allow him the next function
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "error in server "+error.message });
  }
}

module.exports = protectedRoute