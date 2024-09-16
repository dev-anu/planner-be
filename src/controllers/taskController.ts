// src/controllers/taskController.ts
import { Request, Response } from 'express';
import { Task } from '../models/TaskModel';
import { Project } from '../models/ProjectModal';

// Create a new task
export const addTask = async (req: Request, res: Response) => {
  const { name, description, status, projectId } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const task = new Task({ name, description, status, projectId });
    await task.save();

    // Add task ID to the project
    project.tasks.push(task._id);
    await project.save();

    res.status(201).json(task);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tasks for a project
export const getTasksByProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  try {
    const tasks = await Task.find({ projectId });
    res.json(tasks);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single task by ID
export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task by ID
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(id, { name, description, status }, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task by ID
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Remove task from the project
    const project = await Project.findById(task.projectId);
    if (project) {
      project.tasks = project.tasks.filter((taskId:any) => taskId.toString() !== id);
      await project.save();
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
