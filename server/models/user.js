import mongoose from "mongoose";

import { GeoCodeSchema } from "./utility_schemas.js";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 30,
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    unique: true,
    },
    collections: [String],
    saved: [{
        tree: { type: mongoose.Schema.Types.ObjectId, ref: 'Tree' },
        collections: [String],
    }],
    found: [{
        tree: { type: mongoose.Schema.Types.ObjectId, ref: 'Tree' },
        location: [GeoCodeSchema],
    }],
    favorites: [{
        tree: { type: mongoose.Schema.Types.ObjectId, ref: 'Tree' },
        notes: String,
    }]
});

const User = mongoose.model('User', UserSchema);

export default User;