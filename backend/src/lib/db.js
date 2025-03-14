const mongoose = require("mongoose");
function connectDB() {
  return mongoose.connect(process.env.MONGODB_URI);
}

module.exports = connectDB;