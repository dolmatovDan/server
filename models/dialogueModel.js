const mongoose = require('mongoose');

const dialogueSchema = mongoose.Schema({
  messages: {
      type: [String],
      required: false,
      default: []
  },
  users: {
      type: [String],
      required: false,
      default: []
  },
  name: {
      type: String,
      required: true
  },
  admin: {
      type: String,
      required: true
  }
});



// Export Bio Model
let Dialogue = module.exports = mongoose.model('dialogue', dialogueSchema);
module.exports.get = function (callback, limit) {
  Dialogue.find(callback).limit(limit); 
}