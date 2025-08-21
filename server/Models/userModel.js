import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: false, // optional
    trim: true,
    default: "",     // optional: empty by default
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export const userModel =  mongoose.model('user', userSchema);
