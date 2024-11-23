const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : String,
    password : String,
    email : String,
    id: String
},
{
    collection : 'users' // the collection to use for this schema
  });

const UserModel = mongoose.model("users",UserSchema); 

module.exports = UserModel;