import mongoose from "mongoose";

import { Schema } from "mongoose";

const detailsSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  streetAddress: {
    type: String,
    required: true,
  },

  town_city: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export const addressDetailModel = mongoose.model(
  "addressDetail",
  detailsSchema
);
