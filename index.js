// implement your API here
const express = require("express");
const server = express();

const port = 5000;

const db = require("./data/db");

server.listen(port, () => console.log("listening on port", port));

// GET requests
server.get("/", (request, response) => {
    response.json({"message": "Server running on port", port})
})

// GET request: /api/users
server.get("/api/users", (request, response) => {

    db.find()
        .then(data => {
            response.status(200).json(data);
        })
        .catch(error => {
            response.status(500).json({ errorMessage: "The users information could not be retrieved." })
        })
    
})

// GET request: /api/users/:id
server.get("/api/users/:id", (request, response) => {

    const { id } = request.params;

    db.findById(id)
        .then(data => {
            response.status(200).json(data);
        })
        .catch(error => {
            response.status(404).json({ message: "The user with the specified ID does not exist." })
        })
    
})