const pageTemplate = require('./views/view.js')
const page = pageTemplate.page
const list = pageTemplate.list

const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        <body>
            <h1>Hello again.</h1>
        </body>
    </html>
    `)
})


// define endpoints
// listen for get requests
app.get('/users', (req, res) => {
    User.getAll()
    .then(users => {
        const content = list(users)
        res.send(page(content))
    })
})

// listen for post requests
app.post('/users', (req, res) => {
    const newUserName = req.body.name
    User.add(newUserName)
    .then(user => {
        res.send(user)
    })
})

app.get('/todos', (req, res) => {
    Todo.getAll()
    .then(todos => {
        content = list(todos)
        res.send(page(content))
    })
})

// define routing parameters
app.get('/users/byId/:id([0-9]+)', (req, res) => {
    User.getById(req.params.id)
    .then(user => {
        res.send(user)
    })
})

app.post('/users/byId/:id([0-9]+)', (req, res) => {
    const newName = req.body.name
    User.getById(req.params.id)
    .then(user => {
        user.updateName(newName).then(() => {
            res.send(user)
        })
    })
})


app.get('/users/byName/:name([A-Z|a-z]+)', (req, res) => {
    User.getByName(req.params.name)
    .then(users => {
        res.send(users)
    })
})

app.get('/todos/byId/:id([0-9]+)', (req, res) => {
    Todo.getById(req.params.id)
    .then(todo => {
        res.send(todo)
    })
})

app.get('/todos/byName/:name([A-Z | a-z]+)', (req, res) => {
    Todo.getByName(req.params.name)
    .then(todos => {
        res.send(todos)
    })
})

app.get('/todos/byCompleted', (req, res) => {
    Todo.getByCompleted(true)
    .then(todos => {
        res.send(todos)
    })
})

app.get('/todos/byPending', (req, res) => {
    Todo.getByCompleted(false)
    .then(todos => {
        res.send(todos)
    })
})

app.listen(port, () => console.log(`My Todo App listening on port ${port}!`))

// require('dotenv').config()

const Todo = require('./models/Todo')
const User = require('./models/User')


// User.getById(1)
// .then(user => user.getTodos())
// .then(console.log)


// User.add('Jack')
// .then(user => {
//     console.log(user)
//     return Todo.add('walk the chewbacca', true)
//     .then(todo => {
//         todo.assignToUser(user.id)
//         todo.toggleComplete()
//         todo.updateName('walk the yoda')
//     })
//     .then(() => {
//         user.getTodos()
//         .then(console.log)    
//     })
// })


// should we try to limit the number of calls to database 
// should we create and return an object with every method

// return user/todo objects from get all
// wire up express with user/todo endpoints
// wire up express with routing parameters



// create linking table to make todos shareable
