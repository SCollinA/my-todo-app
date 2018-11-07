const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// require('dotenv').config()

const Todo = require('./models/Todo')
const User = require('./models/User')


Todo.addTodo('walk the chewbacca', true)
User.addUser('Jack')