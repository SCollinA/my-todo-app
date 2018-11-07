const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// require('dotenv').config()

const Todo = require('./models/Todo')
const User = require('./models/User')



User.add('Jack')
.then(user => {
    console.log(user)
    return Todo.add('walk the chewbacca', true)
    .then(todo => todo.assignToUser(user.id))
    .then(result => Todo.getById(result.id))
    .then(todo => {
        return todo.toggleComplete()
        .then(() => Todo.getById(todo.id))
    })
    .then(todo => {
        return todo.updateName('walk the yoda')
        .then(() => Todo.getById(todo.id))
    })
    .then(todo => {
        return todo.assignToUser(5)
        .then(() => Todo.getById(todo.id))
    })
    .then(() => {
        return User.getById(5)
        .then(user => {
            console.log(user)
            user.getTodos()
            .then(console.log)    
        })
    })
})
