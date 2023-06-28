var Userdb = require("../model/model");

// Create and save new User
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }
  // New User
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      // res.send(data);
      res.redirect("/add-user");
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Some error occured while creating a create operation",
      });
    });
};

// Retrieve and return all users // Retrieve and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `Not found user with id ${id}` });
        } else {
          res.send(data);
        }
      })
      .catch((error) => {
        res.status(500).send({
          message: error.message || `Error retreiving user id ${id}`,
        });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || "Error occoured while retreiving user information",
        });
      });
  }
};

// Update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Data to Update cannot be empty" });
    return;
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with ${id}. Maybe user not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Error update user information" });
    });
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with ${id}. Maybe user not found`,
        });
      } else {
        res.send({
          message: "User was deleted successfuly",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Error while delete user information" });
    });
};
