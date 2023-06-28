const axios = require("axios");

exports.homeRoutes = (req, res) => {
  // Maoe a get request to /api.users
  axios
    .get("http://localhost:3000/api/users")
    .then(function (response) {
      res.render("index", { user: response.data });
      // console.log(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
  // res.render("index", { users: "New Data" });
};

////////////////////

exports.add_user = (req, res) => {
  res.render("add_user");
};

//////////////////

exports.update_user = (req, res) => {
  axios
    .get("http://localhost:3000/api/users", {
      params: { id: req.query.id },
    })
    .then(function (userdata) {
      res.render("update_user", { user: userdata.data });
    })
    .catch((error) => {
      // console.log(error);
      res.send(error);
    });
};
