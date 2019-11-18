//Lib --
const express = require('express');

//Create and start server --
const server = express();
server.use(express.json());
server.listen(3000);

//Middlewares (Ini) ---------------------------------------------

//GLOBAL
function numberOfRequests(req, res, next) {
    console.count('Number of Requests')
    return next();
}

//LOCAL --
function checkProjectExists(req, res, next) {
    const { id } = req.params;
    const project = projects.find(p => p.id == id);
    if (!project) 
      return res.status(400).json({ error: "Project doesn't exists" });

    return next();
}

//Declare use --
server.use(numberOfRequests);

//Middlewares (End) ---------------------------------------------

//Project Array --
const projects = [];

//List projects --
server.get('/projects', (req, res) => {
  return res.json(projects);
})

//Get project --
server.get('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const project = projects.find(p => p.id == id);
    return res.json(project);
})

//Create project --
server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const project = {
        id,
        title,
        tasks: []
    };

    projects.push(project);
    return res.json(projects);
})

//Update project --
server.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const project = projects.find(p => p.id == id);
    project.title = title;
    return res.json(project);
})

//Delete project --
server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const projectIndex = projects.findIndex(p => p.id == id);
    projects.splice(projectIndex, 1);
    return res.send();    
})

//Create task --
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);
    project.tasks.push(title);
    return res.json(projects);
})