// const router = require("express").Router();
// const {signup, login, logout, updateProfile, checkAuth} = require("../controllers/auth.controller.js");
// const protectedRoute = require("../middlewares/auth.middleware.js");
// const slotController = require('../controllers/user.controller.js');

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);
// router.put("/update-profile",protectedRoute, updateProfile);
// router.get("/check",protectedRoute,checkAuth);


// router.post('/book', slotController.bookSlot);
// router.get('/hospitals', slotController.getHospitals);
// router.get('/departments/:hospitalId', slotController.getDepartmentsByHospital);


// module.exports = router;








const router = require("express").Router();
const {
  bookSlot,
  getHospitals,
  getDepartmentsByHospital,
  getAvailableSlots
} = require("../controllers/user.controller.js");

const {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth
} = require("../controllers/auth.controller.js");

const protectedRoute = require("../middlewares/auth.middleware.js");

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectedRoute, updateProfile);
router.get("/check", protectedRoute, checkAuth);

// Slot Booking + Hospital + Department routes
router.post('/book', bookSlot);
router.get('/hospitals', getHospitals);
router.get('/departments/:hospitalId', getDepartmentsByHospital);
router.get('/slots/available', getAvailableSlots); // ✅ NEW route to fetch available slots

module.exports = router;
