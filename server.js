const express = require('express')
const app = express()
const User = require("./User")
const Post = require("./Post")
const mongoose = require('mongoose');
const uri = "mongodb+srv://admin:admin@cluster0.e6fv8sb.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.port || 3000;

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
