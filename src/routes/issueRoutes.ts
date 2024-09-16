import express from 'express';
import {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
} from '../controllers/issueContoller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Issues
 *   description: Issue management for Projects
 */

/**
 * @swagger
 * /projects/{projectId}/issues:
 *   post:
 *     summary: Create a new issue
 *     tags: [Issues]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [open, in progress, closed]
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *     responses:
 *       201:
 *         description: Issue created successfully
 *       400:
 *         description: Bad request
 */
router.post('/projects/:projectId/issues', createIssue);

/**
 * @swagger
 * /projects/{projectId}/issues:
 *   get:
 *     summary: Get all issues for a project
 *     tags: [Issues]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Returns an array of issues for the project
 *       400:
 *         description: Bad request
 */
router.get('/projects/:projectId/issues', getAllIssues);

/**
 * @swagger
 * /projects/{projectId}/issues/{issueId}:
 *   get:
 *     summary: Get a single issue by ID
 *     tags: [Issues]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: Project ID
 *       - in: path
 *         name: issueId
 *         schema:
 *           type: string
 *         required: true
 *         description: Issue ID
 *     responses:
 *       200:
 *         description: Returns the issue
 *       404:
 *         description: Issue not found
 */
router.get('/projects/:projectId/issues/:issueId', getIssueById);

/**
 * @swagger
 * /projects/{projectId}/issues/{issueId}:
 *   put:
 *     summary: Update an issue
 *     tags: [Issues]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: Project ID
 *       - in: path
 *         name: issueId
 *         schema:
 *           type: string
 *         required: true
 *         description: Issue ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [open, in progress, closed]
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *     responses:
 *       200:
 *         description: Issue updated successfully
 *       400:
 *         description: Bad request
 */
router.put('/projects/:projectId/issues/:issueId', updateIssue);

/**
 * @swagger
 * /projects/{projectId}/issues/{issueId}:
 *   delete:
 *     summary: Delete an issue
 *     tags: [Issues]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: Project ID
 *       - in: path
 *         name: issueId
 *         schema:
 *           type: string
 *         required: true
 *         description: Issue ID
 *     responses:
 *       200:
 *         description: Issue deleted successfully
 *       404:
 *         description: Issue or Project not found
 */
router.delete('/projects/:projectId/issues/:issueId', deleteIssue);

export default router;
