let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

//CREATE EXPRESS APP
const app = express();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Student Model
let projectSchema = require("../models/Project");
let userSchema = require("../Models/User");

// CREATE new project
router.route("/create-project").post((req, res, next) => {
  projectSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
      console.log(req.file);
    }
  });
});

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

// Delete Student
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