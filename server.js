const express = require("express");
//connecting server to MongoDB
const connect = require("./config/db");
const connectDB = require("./config/db");

const app = express();

//Connect database
connectDB();

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server Started on port " + PORT));
