const Project = require('../models/project.model')
const TimeEntry = require('../models/timeEntry.model');

//@desc    Get projects
//@route   GET /api/v1/projects
//@access  Public
const getProject = async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user._id });

        const getProjectHours = await Promise.all(projects.map(async (project) => {
            const timeEntries = await TimeEntry.find({
                project: project._id,
                userId: req.user._id
            });

            const totalTrackedHours = timeEntries.reduce(
                (sum, entry) => sum + (entry.totalHours || 0),
                0
            );

            await Project.findByIdAndUpdate(
                project._id,
                { trackedHours: totalTrackedHours }
            );

            return {
                ...project.toObject(),
                trackedHours: totalTrackedHours
            };
        }));

        res.status(200).json(getProjectHours);


    } catch (error) {
        res.status(500).json({ message: 'Unable to get project.' });
    }
}

//@desc    Create a new project
//@route   POST /api/projects
//@access  Public
const createProject = async (req, res) => {
    try {
        const { name, trackedHours } = req.body;

        // Prevents users from using the same name for their projects
        /*const projectExists = await Project.findOne({ name });
        if (projectExists) {
            return res.status(400).json({ message: 'Project with the same name already exists!' });
        }*/

        const project = await Project.create({
            name,
            trackedHours,
            userId: req.user._id
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Unable to create project.' });
    }
}

//@desc    Update project information
//@route   PATCH /api/projects/:id
//@access  Public
const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found!' });
        }

        if (req.body.name) {
            project.name = req.body.name;
        }

        if (req.body.trackedHours) {
            project.trackedHours = req.body.trackedHours;
        }

        const updatedProject = await project.save();
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: 'Unable to update project information.' });
    }
}

//@desc    Delete a project
//@route   DELETE /api/projects/:id
//@access  Public
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found!' });
        }

        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Project successfully deleted!' });
    } catch (error) {
        res.status(500).json({ message: 'Unable to delete project.' });
    }
}

module.exports = { getProject, createProject, updateProject, deleteProject };