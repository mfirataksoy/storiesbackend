const Post = require("./Post");
const User = require("./User")
const mongoose = require("mongoose")

const {Schema} = mongoose

const familySchema = new Schema({
    familyName: String,
    createdDate: Date,
    adminUser: {type: Schema.Types.ObjectId, ref: "User"},
    feed: [{type: Schema.Types.ObjectId, ref: "Post"}],
    members: [{type: Schema.Types.ObjectId, ref: "User"}],
  });

const Family = mongoose.model("Family", familySchema)
module.exports = Family;