const express = require('express')
const app = express()
const User = require("./User")
const Post = require("./Post")
const mongoose = require('mongoose');const { rawListeners } = require('./User');
const uri = "mongodb+srv://admin:admin@cluster0.e6fv8sb.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.port || 3000;
app.use(express.json());



main().catch(err => console.log(err));

async function main() {
    const db = mongoose.connect(uri);
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
  }

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    console.log("Sever console log.")
});

app.get("/posts", async (req, res) => {
  const posts = await Post.find().populate("postedBy")
  console.log(posts)
  res.send("returned" + posts)
})


app.get("/users", async (req, res) => {
  try {
    const users = await User.find()
    res.send("returned" + users)
  } catch (error) {
    console.log(error)
  }
  
})

app.post("/register", async (req, res) => {
  
  try {

    let user = User.findOne({email: req.body.email})
    if (user) return res.status(400).send("User already registered.");

    user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      profilePicUrl: req.body.profilePicUrl,
      date: req.body.birthday,
      email: req.body.email
    }) 
    await user.save();
    console.log(user)
    res.send("user added with " + user);
  } catch (error) {
    console.log(error)
  }
})

app.get("/user/:id", async (req, res) =>{
  try {
    const user = await User.findById(req.params.id)
    res.send(user)
  } catch (error) {
    console.log(error);
  }
  
})

app.post("/post/:userid", async (req, res) => {

  try {

    const user = await User.findById(req.params.userid).populate("familyId");

    console.log(user);
    
    const post = await Post.create({
      audioUrl: req.body.audioUrl,
      description: req.body.description,
      date: Date.now(),
      postedBy: req.params.userid, 
      familyId: user.familyId
    }) 
    await post.save();
    console.log(post)
    res.send("user added with " + post);
  } catch (error) {
    console.log(error)
  }

})

// app.get("/posts/:familyId", (req, res) => {})


