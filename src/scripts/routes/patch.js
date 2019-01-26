var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();

const CardPayment = require("../db_models/CardPayment");
const RequirePayment = require("../db_models/RequirePayment");

function markUntrusted(model) {
  return (req, res) => {
    console.log(req.body);
    model
      .findOneAndUpdate({ _id: req.body.id }, { trusted: false })
      .exec()
      .then(docs => {
        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(400).json({
          error: err
        });
      });
  };
}

router.patch("/card-payment", markUntrusted(CardPayment));
router.patch("/require-payment", markUntrusted(RequirePayment));

module.exports = router;
