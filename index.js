var express = require('express')
var database = require('./database')
var bodyParser = require('body-parser')
var app = express()
var db = new database()

db.connection()
db.migrate()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/tasks', function (req, res) {
    db.knex('tasks').insert({
        parent_id: req.body.parent_id,
        owner_id: req.body.owner_id,
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        finished: req.body.finished
    }).then(result => {
        if (result.length > 0) {
            res.json({ success: true, message: result })
        } else {
            res.json({ success: false, message: 'task didnt created' })
        }
    }).catch(e => {
        res.json({ success: false, message: e })
    })
})

app.get('/tasks/:user_id', function (req, res) {
    db.knex('tasks').where({ owner_id: req.params.user_id }).select().then(result => {
        if (result.length > 0) {
            res.json({ success: true, message: result })
        } else {
            res.json({ success: false, message: 'cant get task' })
        }
    }).catch(e => {
        res.json({ success: false, message: e })
    })
})

app.put('/tasks/:task_id', function (req, res) {
    db.knex('tasks').where({ id: req.params.task_id }).update({
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        finished: req.body.finished
    }).then(result => {
        if (result.length > 0) {
            res.json({ success: true, message: result })
        } else {
            res.json({ success: false, message: 'task didnt updated' })
        }
    }).catch(e => {
        res.json({ success: false, message: e })
    })
})

app.delete('/tasks/:task_id', function (req, res) {
    db.knex('tasks').where({ id: req.params.task_id }).delete().then(result => {
        if (result.length > 0) {
            res.json({ success: true, message: result })
        } else {
            res.json({ success: false, message: 'task didnt deleted' })
        }
    }).catch(e => {
        res.json({ success: false, message: e })
    })
})

app.post('/users', function (req, res) {
    db.knex('users').insert({
        login: req.body.login,
        password: req.body.password
    }).then(result => {
        if (result.length > 0) {
            res.json({ success: true, message: result })
        } else {
            res.json({ success: false, message: 'account didnt created' })
        }
    }).catch(e => {
        res.json({ success: false, message: e })
    })
})

app.get('/auth', function (req, res) {
    var auth = req.body
    var user
    db.knex('users').where('login', auth.login).select().then(result => {
        if (result.length > 0) {
            user = result
        } else {
            res.send({ stasus: false, message: 'incorrect login' })
        }
    })
    if (user.password === auth.password) {
        res.send({ stasus: true, message: 'successful' })
    } else {
        res.send({ stasus: false, message: e })
    }
})

app.put('/users/:user_id', function (req, res) {
    db.knex('users').where({ id: req.params.user_id }).update({
        password: req.body.password
    }).then(result => {
        if (result.length > 0) {
            res.json({ success: true, message: result })
        } else {
            res.json({ success: false, message: 'password didnt changed' })
        }
    }).catch(e => {
        res.json({ success: false, message: e })
    })
})

app.get('/', function (req, res) {
    res.send('Hello, World!')
})

app.listen(80, function () {
    console.log('Example app listening on port 80!')
})