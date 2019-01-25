const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/api/user_info", (req, res) => {
  res.send({
    name: "Косматкин Геннадий Юрьевич",
    phone: "+79162349506",
    site: "www.kosmo.org",
    email: "kosmo@gmail.com"
  });
});

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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    return res.status(200).json({ text: "ok" });
  }
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
    return res.status(200).json({ text: "ok" });
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    return res.status(200).json({ text: "ok" });
  }
);
