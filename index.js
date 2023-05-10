import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";

import loginRoutes from "./routes/login.js";
import flightRoutes from "./routes/flights.js";
import bookingRoutes from "./routes/bookings.js";
import quoteRoutes from "./routes/quotes.js";
import messageRoutes from "./routes/messages.js";

const app = express();
const port = process.env.PORT || 5000;

//  Configuring .env
dotenv.config();

// Configuring boyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Configuring CORS
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Connecting database
const mongodbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority&ssl=true`;

mongoose.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Test route
app.get("/", (req, res) => {
  res.send({status:200, message:"API is working"});
});

// Adding routes
app.use("/login", loginRoutes);
app.use("/flights", flightRoutes);
app.use("/bookings", bookingRoutes);
app.use("/quotes", quoteRoutes);
app.use("/messages", messageRoutes);

// Starting server
app.listen(port, "0.0.0.0", function () {
  console.log("Server running at 5000");
});

export default app;
