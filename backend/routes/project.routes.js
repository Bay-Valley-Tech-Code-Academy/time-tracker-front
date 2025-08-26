const express = require('express');
const { getProject, createProject, updateProject, deleteProject } = require('../controllers/project.controller');

const router = express.Router();

router.get('/', getProject);
router.post('/create', createProject);
router.patch('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;