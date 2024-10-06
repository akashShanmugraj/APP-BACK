const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const profileRoutes = require("./routes/profileRoutes.js");
const postsRoutes = require("./routes/postsRoutes.js");
const commentRoutes = require("./routes/commentRoutes.js");


const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

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
app.use("/api/reqinfo", (req, res) => {
  const requestObject = {
    "req.app": req.app,
    "req.baseurl": req.baseUrl,
    "req.body": req.body,
    "req.cookie": req.cookie,
    "req.hostname": req.hostname,
    "req.ipv6": req.ipv6,
    "req.params": req.params,
    "req.path": req.path,
    "req.protocol": req.protocol,
    "req.query": req.query,
    "req.route": req.route,
    "req.tlsInsecure": req.tlsInsecure,
    "req.auth": req.auth,
  };
  res.send(requestObject);
  }
)