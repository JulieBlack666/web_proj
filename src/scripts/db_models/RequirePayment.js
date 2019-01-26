const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  inn: Number,
  bik: Number,
  acc: Number,
  for: String,
  sum: Number,
  tel: String,
  mail: String,
  trusted: Boolean
});

module.exports = mongoose.model("RequirePayment", paymentSchema);
