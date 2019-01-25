const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  cardNo: String,
  cardExpDate: String,
  cvc: Number,
  sum: Number,
  comment: String,
  mail: String
});

module.exports = mongoose.model("CardPayment", paymentSchema);
