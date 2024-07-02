const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Ensures emails are stored in lowercase to avoid case-sensitive duplicates
    trim: true // Removes any trailing whitespace from the email
  },
  password:{
    type:String,
    required:true
  },
  age: {
    type: Number,
    required: false // Age is optional
  },
  avatar: {
    type: String,
    default: null,
  },
  avatarPath: {
    type: String,
    default: null,
  },
  phoneNumber: {
    type: String,
    default: null,
  },
  countryCode: {
    type: String,
    default: null,
  },
  country: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  street: {
    type: String,
    default: null,
  },
  zipcode: {
    type: Number,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets the current date when a new user is created
  },
  isActive: {
    type: Boolean,
    default: true // Default user status is active
  },
  role: {
    type: String,
    enum: ['user','admin'], // Role must be one of these values
    default:'user'
  },
},{
    timestamps:true
});

// Compile the schema into a model and export it
const Users = mongoose.model('User', userSchema);
module.exports = Users;
