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
    });
  } else {
    Users.insert(req.body)
      .then( (newUser) => {
        res.status(201).json(newUser);
      })
      .catch( (err) => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
          error: err.message
        });
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
      console.log(err);
      res.status(500).json({
        message: "The users information could not be retrieved"
      });
    })
})

// [GET] /api/users/:id (R of CRUD, individual user by id)
server.get("/api/users/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: `The user with the specified ID does not exist`,
      });
    } else {
      res.json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "The user information could not be retrieved"
    });
  }
})


// [PUT] /api/users/:id (U of CRUD, individual user by id)
server.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    if ( !user.name || !user.bio ) {
      res.status(400).json({
        message: "Please provide name and bio for the user"
      });
    }
    const updatedUser = await Users.update( id, user );
    if (!updatedUser) {
      res.status(404).json({
        message: `The user with the specified ID does not exist`,
      });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be modified"
    });
  }
})

// [DELETE] /api/users/:id (D of CRUD, remove user by id)
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then( (deletedUser) => {
      if (!deletedUser) {
        res.status(404).json({
          message: `The user with the specified ID does not exist`,
        });
      } else {
        res.json(deletedUser);
      }
    }) 
    .catch( (err) => {
      console.log(err);
      res.status(500).json({
        message: "The user could not be removed"
      });
    })
})

module.exports = server; // EXPORT THE SERVER
