// src/controllers/projectController.ts
import { Request, Response } from 'express';
import { Project } from '../models/ProjectModal';
import { User } from '../models/UserModal';

// Add a new project with multiple users
export const addProject = async (req: Request, res: Response) => {
  const { name, description, startDate, endDate, userIds } = req.body;

  try {
    // Create the new project
    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      userIds,  // Multiple users in the project
    });

    const project = await newProject.save();

    // Associate the project with each user in the userIds array
    await User.updateMany(
      { _id: { $in: userIds } },
      { $push: { projectIds: project._id } }
    );

    res.status(201).json(project);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a project (e.g., to add/remove users or modify project details)
export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, startDate, endDate, userIds } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, {
      name,
      description,
      startDate,
      endDate,
      userIds, // Update project users
    }, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update users' projectIds (if userIds changed)
    await User.updateMany(
      { _id: { $in: userIds } },
      { $addToSet: { projectIds: updatedProject._id } }
    );

    res.json(updatedProject);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Remove the project reference from users
    await User.updateMany(
      { _id: { $in: project.userIds } },
      { $pull: { projectIds: project._id } }
    );

    res.json({ message: 'Project deleted successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

// Update project status
export const updateProjectStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProjects = async (req: Request, res: Response) => {
    const { userId, startDate, endDate, id } = req.query;
  
    try {
      let query: any = {};
  
      if (id) {
        query._id = id;
      }
  
      if (userId) {
        query.userIds = userId;
      }
  
      if (startDate || endDate) {
        query.startDate = query.startDate;
        query.endDate = query.endDate;
      }
  
      const projects = await Project.find(query).populate('userIds');
  
      res.json(projects);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const project = await Project.findById(id).populate('userIds');
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      res.json(project);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  };