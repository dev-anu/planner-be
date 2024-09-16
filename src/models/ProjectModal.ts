// src/models/Project.ts
import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['not started', 'in progress', 'completed'], default: 'not started' },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }], // Add issues here
  userIds: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Multiple users in a project
}, { timestamps: true });

export const Project = model('Project', ProjectSchema);
