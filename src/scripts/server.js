const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(require("./routes/get"));
app.use(require("./routes/post"));
app.use(require("./routes/patch"));

mongoose.connect(
  `mongodb://fuckyou:fucky0u@cluster0-shard-00-00-3cdok.mongodb.net:27017,cluster0-shard-00-01-3cdok.mongodb.net:27017,cluster0-shard-00-02-3cdok.mongodb.net:27017/test-bank?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`
);

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/api/user_info", (req, res) => {
  res.send({
    name: "Косматкин Геннадий Юрьевич",
    phone: "+79162349506",
    site: "www.kosmo.org",
    email: "kosmo@gmail.com"
  });
});
