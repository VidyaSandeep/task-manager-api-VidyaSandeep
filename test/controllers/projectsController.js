
const {projects} = require('../models/projectsModel');
const getAllProjects = (req, res) => {
    console.log(req.query);
    res.send(projects);
}

module.exports = {getAllProjects};   