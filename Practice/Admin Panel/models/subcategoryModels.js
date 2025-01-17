const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  categoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  subcategory: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    default: "deactive",
  },
});

const subcategory = mongoose.model("subcategory", userSchema);

module.exports = subcategory;
