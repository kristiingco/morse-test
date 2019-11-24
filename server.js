var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var cors = require('cors');

var QUESTIONS_COLLECTION = "question";
var SCORES_COLLECTION = "score";
var USERS_COLLECTION = "user";

var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

var distDir = __dirname + "/dist/";
 app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

app.use(cors({origin: '*'}));

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
  var server = app.listen(process.env.PORT || 4200, function () {
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
   *    GET: returns all question from the db based on the params
   *    Required Params: 
   *    question_type=[input,visual,audio]
   *    round=[0,1,2]
   *    0 being the pre-test
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

  /*  "/api/scores"
   *    POST: returns the newly added score 
   *    Required Params: 
   *    [question_id,user_id,score_obtained,start_timestamp,end_timestamp]
   *    Optional Params:
   *    [wrong_answer]
   */
  app.post("/api/scores", function(req, res) {
    console.log(req.body);
    var newScore = req.body;
    console.log(newScore);
  
    if (!newScore.question_id || !newScore.user_id || !newScore.score_obtained || !newScore.start_timestamp || !newScore.end_timestamp) {
      handleError(res, "Invalid user input", "Missing one of the required fields: [question_id,user_id,score_obtained,start_timestamp,end_timestamp]", 400);
    } else {
      db.collection(SCORES_COLLECTION).insertOne(newScore, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to add the score.");
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
    }
  });

  /*  "/api/login"
   *    POST: returns the id of the user, question_id of the first question that they haven't answered
   *    Required Params: 
   *    [user_id, password]
   */
  app.post("/api/login", async function(req, res) {
    var user = req.body;
    var user_id = user.user_id;
    var password = user.password;
    if (!user_id || !password) {
      res.status(400).json({message: 'fail'});
    } else {
      db.collection(USERS_COLLECTION).count({ user_id: user_id })
      .then( async (count) => {
        if (count > 0) {
          var userObject = await db.collection(USERS_COLLECTION) .findOne({user_id: user_id});
          if (userObject.password == password){
            db.collection(SCORES_COLLECTION).find({user_id: user_id}).count(function (err, count) {
              if (!err && count !== 0) {
                db.collection(SCORES_COLLECTION).find({user_id: user_id}).sort({question_id:-1}).limit(1)
                .toArray(function(err, docs) {
                  if (!err) {
                    console.log(docs);
                    var question_id = parseInt(docs[0].question_id) + 1;
                    console.log(question_id);
                    res.status(200).json({user_id: user_id, question_id: question_id.toString(), message: 'success'});
                  }
                });
              } else {
                res.status(200).json({user_id: user_id, question_id: "1", message: 'success'});
              }
            });
        } else {
          res.status(400).json({message: 'fail'});
        }
      } else {
        res.status(400).json({message: 'fail'});
      }
      })
    }
  });