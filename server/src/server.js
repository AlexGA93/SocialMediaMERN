const express = require("express");
const app = express();
require('dotenv').config()
//Connect database
require('./config/db');

//Init Midlleware
app.use(
  express.json({
    extended: false,
  })
);


app.get("/", (req, res) => res.send("API Running"));
//Define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;
console.log(process.env.PORT+"***********************************8");
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
