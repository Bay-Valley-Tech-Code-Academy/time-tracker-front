const express = require('express');
const { getProject, createProject, updateProject, deleteProject } = require('../controllers/project.controller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect,  getProject);
router.post('/create', protect, createProject);
router.patch('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;