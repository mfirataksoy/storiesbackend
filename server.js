const express = require('express')
const app = express()
const User = require("./User")
const Post = require("./Post")
const mongoose = require('mongoose');const { rawListeners } = require('./User');
const Family = require('./Family');
const uri = "mongodb+srv://admin:admin@cluster0.e6fv8sb.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.port || 3000;
var cors = require('cors')

app.use(express.json());

app.use(cors());

app.listen(port, () => {
  console.log("Server started at port " + port)
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})


main().catch(err => console.log(err));

async function main() {
    const db = mongoose.connect(uri);
  }


app.get("/posts", async (req, res) => {
  const posts = await Post.find().populate("postedBy").populate("familyId")
  console.log(posts)
  res.json(posts)
})


app.get("/users", async (req, res) => {
  try {
    const users = await User.find().populate("familyId")
    res.json(users)
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
    res.json(user);
  } catch (error) {
    console.log(error)
  }
})

app.get("/user/:id", async (req, res) =>{
  try {
    const user = await User.findById(req.params.id).populate("familyId")
    res.json(user)
  } catch (error) {
    console.log(error);
  }
  
})

app.put("/user/:id", async (req, res) => {
  try{

    const filter = { _id: req.params.id };
    const update = { firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password,  email: req.body.email};

    // `doc` is the document _before_ `update` was applied
    let user = await User.findOneAndUpdate(filter, update);

    await user.save();

    res.json(user)
  }
  catch{

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
    res.json(post);
  } catch (error) {
    console.log(error)
  }

})

app.post("/createfamily/:userid", async (req, res) => {
  try {
    
    const user = await User.findById(req.params.userid);

    const family = await Family.create({
      familyName: req.body.familyName,
      createdDate: Date.now(),
      adminUser: user._id,
      members: [user._id],
    })
    await family.save();
    user.familyId.push(family._id);
    await user.save();

    res.json(family)

  } catch (error) {
    console.log(error)
    res.send("error")
  }
})

app.get("/posts/:familyId", (req, res) => {
  
  const posts = Post.find(familyId)

})

app.get("/families", async (req, res) => {

  const families = await Family.find().populate("adminUser").populate("members");

  res.json(families);

})


// app.get("/invite/:familyId", async (req, res) => {
//   req.body.email
// })