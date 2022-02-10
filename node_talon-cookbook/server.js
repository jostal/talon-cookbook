const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
})

const routes = require('./routes/routes.js')(app, fs);

const server = app.listen(3001, () => {
  console.log('listening on port %s', server.address().port);
});
