var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var QUESTIONS_COLLECTION = "question";

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
 app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://salmon:sashimi1@ds331558.mlab.com:31558/heroku_www30lwf", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// MORSE API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }
  
  /*  "/api/questions"
   *    GET: returns all question from the db
   *    Params: question_type=[input,visual,audio,{blank}]
   *    If blank it will return all the questions.
   */
  app.get("/api/questions", function(req, res) {
    var question_type = req.query.question_type;
    var round = req.query.round;
    db.collection(QUESTIONS_COLLECTION).find({type: question_type, round: round}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get questions.");
        } else {
            res.status(200).json(docs);
        }
    });
    
  });