const jwt = require("jsonwebtoken");
function generateToken(userId , res){
const token = jwt.sign({id:userId}, process.env.JWT_SECRET, {expiresIn:"1d"});
                        //payload
res.cookie("jwt", token, {
    expiresIn:"1d", 
    httpOnly:true,
    secure:process.env.NODE_ENV === "production" ? true : false
});

return token;
}

module.exports = generateToken; 