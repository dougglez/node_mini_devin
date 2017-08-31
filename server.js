var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var port = 3000;

var users = [
  {id: 1, name: "Doug", age: 27},
  {id: 2, name: "Harold", age: 91},
  {id: 3, name: "Jeff", age: 18}
];


app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
  console.log('Middleware function', req.originalUrl);
  next();
});


app.get('/api/test', function(req, res, next) {
  console.log('hey there');
  res.send('Hey there');
});

// used to retrieve information
app.get('/api/user', function(req, res) {
  res.status(200).send(users);
});

app.get('/api/user/:id', function(req, res) {
  let user = users.filter(function(value, index, array) {
    return value.id == req.params.id;
  });
  res.status(200).send(user)
});
//used to add new info
app.post('/api/user', function(req, res) {
  console.log('inside post', req.body);
  users.push(req.body);
  res.status(200).send(users);
});

//used to update info
app.put('/api/user/:id', function(req, res) {
  console.log('inside put');
  res.status(200).send({name: 'Jeff', age: 27});
});

// used to delete info
app.delete('/api/user/:id', function(req, res) {
  console.log('inside delete');
  res.status(200).send({name: 'Deleted', age: null});
});


app.listen(port, function() {
  console.log(`Ship docked at port ${port}`);
});