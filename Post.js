const User = require("./User");
const Family = require("./Family")
const mongoose = require("mongoose")
const {Schema} = mongoose

const postSchema = new Schema({
    audioUrl: String,
    description: String,
    date: Date,
    comments: [{body: String, by: Schema.Types.ObjectId}],
    postedBy: {type: Schema.Types.ObjectId, ref: "User"},
    familyId: [{ type : Schema.Types.ObjectId, ref: 'Family' }]});

const Post = mongoose.model("Post", postSchema)
module.exports = Post;