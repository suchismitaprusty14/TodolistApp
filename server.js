const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv"); // for security purpose
const cors = require("cors");
const connectDB = require("./config/db");
// cnofig to dotenv like set path to find it as it is present root we dont have to give path
dotenv.config();

const app = express(); // adding all functionality to app

// middlewares
app.use(express.json()); // client get data in json format
app.use(morgan("dev"));
app.use(cors());

//dbconnection
connectDB();

//routes
app.use("/user", require("./routes/userRoute"));
app.use("/todo", require("./routes/todoRoute"));

//port
const PORT = process.env.PORT || 8000; // we use process as to  accsess environmental variable(present in env file)
//listen
app.listen(PORT, () => {
  console.log(
    `node server running on ${process.env.DEV_MODE} on port no ${PORT} `
  );
});
