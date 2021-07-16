const mongoose = require("mongoose");
require('dotenv').config();

// const db = config.get("mongoURI");
const db = process.env.MONGOURI;
// o SocialMedia
//connect to MongoDB with promise


//console.log(db);

mongoose.connect(db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(db => console.log(`connected to MongoDB successfully!!!`))
  .catch(err => console.error(err));
