import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

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
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tree' },
        collections: [String],
    }],
    found: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tree' },
        location: GeoCodeSchema,
    }],
    favorites: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tree' },
        notes: String,
  }],
  accessToken: {
    type: String,
    default: '',
    },
  refreshToken: {
    type: String,
    default: '',
  }
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

export default User;