const router = require("express").Router();
const {signup, login, logout, updateProfile, checkAuth} = require("../controllers/auth.controller.js");
const protectedRoute = require("../middlewire/auth.middlewire.js");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile",protectedRoute, updateProfile);

router.get("/check",protectedRoute,checkAuth);
module.exports = router;