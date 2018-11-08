const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Try /users or /todos'))


// define endpoints
app.get('/users', (req, res) => {
    User.getAll()
    .then(users => {
        res.send(users);
    })
})

app.get('/todos', (req, res) => {
    Todo.getAll()
    .then(todos => {
        res.send(todos);
    })
})

// define routing parameters

app.get('/users/:id([0-9]+)', (req, res) => {
    User.getById(req.params.id)
    .then(user => {
        res.send(user);
    })
})

app.get('/users/:name([a-z]+)', (req, res) => {
    User.getByName(req.params.name)
    .then(user => {
        res.send(user)
    })
})

app.get('/todos/:id([0-9]+'), (req, res) => {
    Todo.getById(req.params.id)
    .then(todo => {
        res.send(todo);
    })
})

app.get('/todos/:name([a-z]+)', (req, res) => {
    Todo.getByName(req.params.name)
    .then(todo => {
        res.send(todo)
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
