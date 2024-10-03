const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    pref: {
      type: [String],
      required: false,
    },
    place: {
      type: String,
      required: false,
    },
    artists: {
      type: [String],
      required: false,
    },
    profilepic: {
      url: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
