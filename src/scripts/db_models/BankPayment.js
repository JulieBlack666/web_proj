const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  inn: Number,
  bik: Number,
  for: String,
  sum: Number
});

module.exports = mongoose.model("OnlineBankPayment", paymentSchema);
