var express = require('express')
var database = require('./database')
var app = express()

var db = new database()
db.connection()
db.migrate()

app.get('/', function (req, res) {
  res.send('Hello World!')
  db.knex.select('tasks')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})