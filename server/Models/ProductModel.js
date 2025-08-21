// models/Product.js

import mongoose, {Schema} from 'mongoose'

const ProductSchema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true }, 
  rating: { type: Number, required: true },
})

export const Product =  mongoose.model('product' , ProductSchema);

