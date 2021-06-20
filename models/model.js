const mongoose = require('mongoose');

const bioSchema = mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  created_at: {
      type: Date,
      default: Date.now,
      required: false
  },
  password: {
      type: String,
      required: true
  }  
});

// Export Bio Model
let Bio = module.exports = mongoose.model('bio', bioSchema);
module.exports.get = function (callback, limit) {
   Bio.find(callback).limit(limit); 
}