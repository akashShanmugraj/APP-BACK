import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";


const app = express();

//! CORS Implementation TODO
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

app.use(morgan("dev"));

app.get("/apiCheck", (req, res) => {
  res.send("This is the Grievance Port API... Online and Active!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening on http://localhost:${process.env.PORT}`);
  });
  