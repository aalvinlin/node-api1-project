// implement your API here
const express = require("express");
const server = express();
const port = 5000;

server.use(express.json())

const db = require("./data/db");

server.listen(port, () => console.log("listening on port", port));

// POST request: /api/users
server.post("/api/users", (request, response) => {

    const userInfo = request.body

    if (!userInfo.name || !userInfo.bio)
        { response.status(400).json({ errorMessage: "Please provide name and bio for the user." })}
    
    else
        {
            db.insert(userInfo)
                .then(user => {
                    response.status(201).json(user);
                })
                .catch(error => {
                    response.status(500).json({ errorMessage: "There was an error while saving the user to the database." })
                })
        }

    
})

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
            // zero means no user found with specified ID; SQLite servers start at index 1
            if (data === 0)
                { response.status(404).json({ message: "The user with the specified ID does not exist." }) }
            // return the user object
            else
                { response.status(200).json(data); }
        })
        .catch(error => {
            response.status(500).json({ message: "The user's information could not be retrieved." })
        })
    
})


// DELETE request: /api/users/:id
server.delete("/api/users/:id", (request, response) => {

    const { id } = request.params;

    // first check to see whether user exists
    db.findById(id)
        .then(user => {
            // zero means no user found with specified ID; SQLite servers start at index 1
            if (user === 0)
                {
                    response.status(404).json({ message: "The user with the specified ID does not exist." })
                }
            
            // user exists; try to delete
            else
                {
                    db.remove(id)
                        // return info of deleted user
                        .then(data => {
                            response.status(200).json(user);
                        })
                        .catch(error => {
                            response.status(500).json({ message: "The user information could not be retrieved." })
                        })
                }
        })
        .catch(error => {
            response.status(500).json({ message: "The user information could not be retrieved." })
        })

    
})