import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";

import profileRoutes from "./routes/profileRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();

//! CORS Implementation TODO
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

//mongoose connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Your server startup logic here
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
  });

//dotenv config
dotenv.config();

app.use(morgan("dev"));

app.get("/api/check", (req, res) => {
  res.send("This is the Grievance Port API... Online and Active!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on http://localhost:${process.env.PORT}`);
  });



//routes
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentRoutes);