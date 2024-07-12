const express = require('express')
const app = express()
const port = 3001

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

let userRole = "";

app.post('/signup', function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;


  if (USERS.find(user => user.email !== email)) {
    USERS.push({ email, password, role });
  }

  res.sendStatus(200);
})

app.post('/login', function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = USERS.find(user => user.email === email && user.password === password);
  userRole = user.role; 

  if (user) {
    res.sendStatus(200);
    res.send(user.token);
  } else {
    res.sendStatus(401);
  }
})

app.get('/questions', function(req, res) {
  res.send(QUESTIONS);
})

app.get("/submissions", function(req, res) {
   const question = req.body.question;
   const submissions = SUBMISSION.filter(submission => submission.question === question);
   res.send(submissions);
});


app.post("/submissions", function(req, res) {
   const question = req.body.question;
   let status = ["Accepted", "Rejected"];
   const response = status[Math.floor(Math.random() * status.length)];
   SUBMISSION.push({ question, response });
   res.sendStatus(200);
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.post("/add-problem", function(req, res) {
  if (userRole === "admin") {
    const question = req.body.question;
    const description = req.body.description;
    const testCases = req.body.testCases;
    QUESTIONS.push({ question, description, testCases });
    res.sendStatus(200);
  }
}); 

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})