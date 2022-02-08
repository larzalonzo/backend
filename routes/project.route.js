let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Model
let projectSchema = require("../models/Project");
let userSchema = require("../Models/User");

const { upload, uploadFile } = require("../controllers/userController");

// upload document route
router.post("/upload", uploadFile, upload);

// postman creating a new project
// {
//   "name": "test1",
//   "deadline" : "2022-01-01",
//   "document": "testdoc",
//   "userId" : "62019658b1182313e6f488b3"
// }

// CREATE new project
router.route("/create-project").post((req, res, next) => {
  projectSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// create a new user
// {
//   "name": "vidurath"
// }

// CREATE new user
router.route("/create-user").post((req, res, next) => {
  userSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// list project
router.route("/").get((req, res) => {
  projectSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// list Users
router.route("/users").get((req, res) => {
  userSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Single project
router.route("/edit-project/:id").get((req, res) => {
  projectSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update project
router.route("/update-project/:id").put((req, res, next) => {
  projectSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Project updated successfully !");
      }
    }
  );
});

// Delete project
router.route("/delete-project/:id").delete((req, res, next) => {
  projectSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
