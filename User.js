const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    profilePicUrl: String,
    birthday: Date,  
    familyId: [{type: Schema.Types.ObjectId, ref: "Family"}]
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
