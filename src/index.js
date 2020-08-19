require('dotenv').config();
const cors = require("cors");
const express = require("express");
const { uuid } = require("uuidv4");

const app = express();

app.use(cors());
app.use(express.json());


const projects = [];

app.get("/projects", (request, response) => {
  return response.json(projects);
});

app.post("/projects", (request, response) => {
  const { name, age, company, skills } = request.body;

  const project = { id: uuid(), name, age, company, skills };

  projects.push(project);

  return response.json(project);
});

app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { name, age, company, skills } = request.body;

  const projectIndex = projects.findIndex((project) => project.id == id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  const project = {
    id,
    name,
    age,
    company,
    skills,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete("/projects/:id", (request, response) => {
  return response.json(["id","name", "age", "company", "skills",]);
});





const port = process.env.PORT || 3333;
app.listen(port, () => {
    console.log(`server up and runing on port ${port}`);

});