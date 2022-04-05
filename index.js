//for setting up express server
const express = require("express");

//Port on which app will be running
const port = 8002;

//db for the app
const db = require("./config/mongoose");

//Schema for all the tasks
const Task = require("./models/tasks");

//using app with express
const app = express();
const bodyParser = require("body-parser");

//for using static files
app.use(express.static("./assets"));

app.use(bodyParser.urlencoded({ extended: false })); //for encrypted data

//setting ip view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//For rendering the app
app.get("/", function (req, res) {
  Task.find({}, function (err, task) {
    if (err) {
      console.log("Error in fetching tasks from db");
      return;
    }
    return res.render("home", {
      title: "TODOS APP",
      task: task,
    });
  });
});

// CREATING TASK CONTROLLER
app.post("/create-task", function (req, res) {
  Task.create(
    {
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
    },
    function (err, newTask) {
      if (err) {
        console.log("Facing error while creating task: ", err);
      }
      return res.redirect("back");
    }
  );
});

//to delete the task

app.get("/delete-task", function (req, res) {
  // get the id from query
  let id = req.query;

  // checking the number of tasks selected to delete
  let count = Object.keys(id).length;
  for (let i = 0; i < count; i++) {
    // finding and deleting tasks from the DB one by one using id
    Task.findByIdAndDelete(Object.keys(id)[i], function (err) {
      if (err) {
        console.log("error in deleting task");
      }
    });
  }
  return res.redirect("back");
});
//deleting individually
app.get("/delete-todo", function (req, res) {
  let id = req.query.id;
  Task.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("error");
      return;
    }
    return res.redirect("back");
  });
});

//Connecting to server
app.listen(port, function (err) {
  if (err) {
    console.log("Error in the the server:", err);
  }
  console.log("Express Server is running on port ", port);
});
