const express = require("express");
const { check, validationResult } = require("express-validator/check");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");

const CardPayment = require("./db_models/CardPayment.js");
const RequirePayment = require("./db_models/RequirePayment");

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
  `mongodb://fuckyou:fucky0u@cluster0-shard-00-00-3cdok.mongodb.net:27017,cluster0-shard-00-01-3cdok.mongodb.net:27017,cluster0-shard-00-02-3cdok.mongodb.net:27017/test-bank?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`
);

lastFileId = 0;

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

function postHandlerTemplate(model) {
  return (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const payment = new model(Object.assign(req.body, { _id: new mongoose.Types.ObjectId() }));
    payment
      .save()
      .then(result => {
        res.status(201).json({
          message: "Запрос был сохранен, и принят в обработку",
          createdPayment: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };
}

app.post(
  "/card_payment",
  [
    check("cardNo").matches(/^\d{4} \d{4} \d{4} \d{4}$/),
    check("cardExpDate").matches(/^((?:0[1-9])|(?:1[0-2]))\/((?:1[7-9])|(?:2\d)|(?:3[0-5]))$/),
    check("cvc")
      .isNumeric()
      .isLength({ min: 3, max: 3 }),
    check("mail").isEmail(),
    check("comment").isLength({ max: 150 }),
    check("sum").isInt({ min: 1000, max: 75000 })
  ],
  postHandlerTemplate(CardPayment)
);

app.post(
  "/bank_payment",
  [
    check("sum").isInt({ min: 1000, max: 75000 }),
    check("inn").matches(/^(\d{10}|\d{12})$/),
    check("bik")
      .isInt()
      .isLength({ min: 9, max: 9 }),
    check("for").matches(/.*(без НДС)|(НДС 18%)|(НДС 10%)/)
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const doc = new PDFDocument();
    fs.writeFileSync(
      `../files/payment${lastFileId}.pdf`,
      `Платёж от ${new Date(Date.now())}\n\nИНН отправителя: ${req.body.inn}\nБИК отправителя: ${
        req.body.bik
      }\nЦель платежа: ${req.body.for}\nСумма платежа: ${req.body.sum}
  \n\nПодпись: ________`
    );
    const data = fs.readFileSync(`../files/payment${lastFileId++}.pdf`);
    res.contentType("text/plain");
    res.send(data);
  }
);

app.post(
  "/req_payment",
  [
    check("sum").isInt({ min: 1000, max: 75000 }),
    check("inn").matches(/^\d{10}|\d{12}$/),
    check("bik")
      .isNumeric()
      .isLength({ min: 9, max: 9 }),
    check("for").matches(/.*(без НДС)|(НДС 18%)|(НДС 10%)/),
    check("mail").isEmail(),
    check("acc")
      .isInt()
      .isLength({ min: 20, max: 20 }),
    check("tel").matches(/^\+7 9\d{2} \d{3}-\d{2}-\d{2}/)
  ],
  postHandlerTemplate(RequirePayment)
);
