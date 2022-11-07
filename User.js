const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String,
    profilePicUrl: String,
    birthday: Date,
    
    relatives: [Schema.Types.ObjectId]
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
