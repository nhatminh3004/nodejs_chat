const mongoose = require("mongoose");

const dichvuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  url: {
    type: String,
    required: true,
    max: 50,
  },
  status: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  website: {
    type: String,
    required: true,
    max: 50,
  },
  socialnetworks: [
    {
      facebook: { type: String },
    },
  ],
});
module.exports = mongoose.model("DichVu", dichvuSchema);
