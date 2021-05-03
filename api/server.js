// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require("./users/model");

const server = express();

// ENDPOINTS

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
