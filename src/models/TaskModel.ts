// src/models/Task.ts
import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['pending', 'inprogress', 'completed'], default: 'pending' },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
}, { timestamps: true });

export const Task = model('Task', TaskSchema);
