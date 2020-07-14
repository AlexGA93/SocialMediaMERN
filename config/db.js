const mongoose = require("mongoose");

const config = require("config");

const db = config.get("mongoURI");

//connect to MongoDB with promise
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

//export
module.exports = connectDB;
