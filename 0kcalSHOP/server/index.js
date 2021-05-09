const express = require("express");
const app = express();
const port = 9000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { User } = require("./models/User");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path');
const { auth } = require("./middleware/auth");
const config = require("./config/key");



app.use(
  cors({
    origin: true,
    credentials: true, //도메인이 다른경우 서로 쿠키등을 주고받을때 허용해준다고 한다
  })
);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use('/api/users', require('./routes/users'));
app.use('/api/product',require('./routes/product'))

// index.html for all page routes    html or routing and naviagtion
// 경로와 index.html은 상황에따라 달라질 수 있음
app.get("*", (req, res) => {
  res.send({
    test:"hi"
  });
});

app.use((err,req,res,next)=>{
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(port, () => console.log(`listening on port ${port}`));