require('dotenv').config()

const Todo = require('./models/Todo')
const User = require('./models/User')

// Todo.toggleCompleteById(1)
// .then(result => {
//     console.log(result)
// })

// Todo.putIn('walk dogs', false)
// .then(console.log)
 
Todo.getAll()
.then(console.log)

User.getAllUsers()
.then(console.log)

// Todo.getById(5)
// .then(console.log)

// Todo.takeOutById(4)
// .then(result => console.log(result))

// User.getAllUsers()
// .then(console.log)

// User.getUserById(3)
// .then(console.log)

// User.addUser('Jimmy')
// .then(console.log)

// User.updateUserNameById("Jason", 6)
// .then(console.log)

// User.deleteUserById(3)
// .then(console.log)

Todo.assignToUser(2, 2)
.then(console.log)