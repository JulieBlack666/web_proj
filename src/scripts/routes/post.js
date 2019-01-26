var express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator/check");
var router = express.Router();

const CardPayment = require("../db_models/CardPayment");
const RequirePayment = require("../db_models/RequirePayment");

router.use(bodyParser.urlencoded({ extended: true }));

function postHandlerTemplate(model) {
  return (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const payment = new model(
      Object.assign(req.body, { _id: new mongoose.Types.ObjectId(), trusted: true })
    );
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

router.post(
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

router.post(
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
    res.attachment(`yuour_payment.txt`);
    res.send(
      `Платёж от ${new Date(Date.now())}\n\nИНН отправителя: ${req.body.inn}\nБИК отправителя: ${
        req.body.bik
      }\nЦель платежа: ${req.body.for}\nСумма платежа: ${
        req.body.sum
      }\n\n\n                                     Подпись: ________`
    );
  }
);

router.post(
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

module.exports = router;
