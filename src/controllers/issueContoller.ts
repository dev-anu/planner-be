import { Request, Response } from 'express';
import { Issue } from '../models/IssueModel';
import { Project } from '../models/ProjectModal';

// Create a new issue
export const createIssue = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const issue = new Issue({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      projectId: projectId,
    });

    await issue.save();

    project.issues.push(issue._id);
    await project.save();

    res.status(201).json(issue);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

// Get all issues for a project
export const getAllIssues = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate('issues');

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(project.issues);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single issue by ID
export const getIssueById = async (req: Request, res: Response) => {
  try {
    const { issueId } = req.params;
    const issue = await Issue.findById(issueId);

    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    res.status(200).json(issue);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

// Update an issue
export const updateIssue = async (req: Request, res: Response) => {
  try {
    const { issueId } = req.params;
    const issue = await Issue.findByIdAndUpdate(issueId, req.body, { new: true });

    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    res.status(200).json(issue);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an issue
export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const { projectId, issueId } = req.params;

    const issue = await Issue.findByIdAndDelete(issueId);
    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    const project = await Project.findByIdAndUpdate(projectId, { $pull: { issues: issueId } });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};
