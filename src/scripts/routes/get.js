var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();

const CardPayment = require("../db_models/CardPayment");
const RequirePayment = require("../db_models/RequirePayment");

function getPayments(model) {
  return (req, res) => {
    if (typeof req.query.sort !== "undefined" && typeof req.query.field !== "undefined") {
      getSortedPayments(req, res, model);
    } else if (typeof req.query.filter !== "undefined" && typeof req.query.field !== "undefined") {
      getFindPayments(req, res, model);
    } else {
      getAllPayments(req, res, model);
    }
  };
}

function getAllPayments(req, res, model) {
  model
    .find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
}

function getSortedPayments(req, res, model) {
  console.log({ [req.query.field]: req.query.sort });
  model
    .find()
    .sort({ [req.query.field]: req.query.sort })
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
}

function getFindPayments(req, res, model) {
  model
    .find({
      [req.query.field]: req.query.filter
    })
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
}

router.get("/card-payment", getPayments(CardPayment));
router.get("/require-payment", getPayments(RequirePayment));

module.exports = router;
