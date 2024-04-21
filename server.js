const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const profileRoutes = require("./routes/profileRoutes.js");
const postsRoutes = require("./routes/postsRoutes.js");
const commentRoutes = require("./routes/commentRoutes.js");


const app = express();

//! CORS Implementation TODO
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );


//dotenv config
dotenv.config();

console.log(process.env.MONGO_URI);

//mongoose connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Your server startup logic here
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
  });



app.use(morgan("dev"));

app.get("/api/check", (req, res) => {
  res.send("This is the Grievance Port API... Online and Active!");
});

app.get("/help", (req, res) => {
  res.sendfile(__dirname + '/help.html');
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