// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require("./users/model");

const server = express();
server.use(express.json());

// ENDPOINTS

// [POST] /api/users (C of CRUD)
server.post("/api/users", (req, res) => {
  const userFromClient = req.body;
  if (!userFromClient.name || !userFromClient.bio) {
    res.status(400).json({
      message: "Please provide name and bio for the user"
    })
  } else {
    Users.insert(req.body)
      .then( (newUser) => {
        res.status(201).json(newUser);
      })
      .catch( (err) => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
          stack: err.stack
        })
      })
  }
})

// [GET] /api/users (The 'R' of CRUD)
server.get("/api/users", (req, res) => {
  Users.find()
    .then( (users) => {
      console.log(users);
      res.json(users);
    })
    .catch( (err) => {
      res.status(500).json({
        error: "something went bad getting all users",
        message: err.message,
        stack: err.stack
      })
    })
})



module.exports = server; // EXPORT THE SERVER
