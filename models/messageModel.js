const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: false,
  },
  sender: {
    type: String,
    required: true,
  },
  dialogue: {
    type: String,
    required: true,
  },
});

// Export Bio Model
let Message = (module.exports = mongoose.model("message", messageSchema));
module.exports.get = function (callback, limit) {
  Message.find(callback).limit(limit);
};
