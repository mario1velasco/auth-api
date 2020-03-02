require("dotenv").config();
const mongoose = require('mongoose');
const MONGODB = `${process.env.MONGODB_URI}${process.env.DB_NAME}`;

mongoose.Promise = Promise;
mongoose.connect(MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true ,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.info(`Connect to db ${MONGODB}`);
  })
  .catch(error => {
    console.error(`Unable to connect to db ${MONGODB}: ${error}`);
  });
