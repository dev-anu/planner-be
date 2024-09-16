// src/models/User.ts
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  projectIds: [{ type: Schema.Types.ObjectId, ref: 'Project' }], // Multiple projects per user
}, { timestamps: true });

export const User = model('User', UserSchema);
