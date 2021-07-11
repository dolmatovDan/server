const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  dialogues: {
    type: [String],
    required: true,
    default: [],
  },
  avatar: {
    type: String,
    required: false,
    default: "",
  },
  name: {
    type: String,
    required: false,
    default: "",
  },
  surName: {
    type: String,
    required: false,
    default: "",
  },
  dialogues: {
    type: [String],
    required: false,
    default: [],
  },
});

// Export Bio Model
let User = (module.exports = mongoose.model("user", userSchema));
module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
};
