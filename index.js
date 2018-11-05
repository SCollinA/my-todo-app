const Todo = require('./models/Todo')

Todo.toggleCompleteById(1)
// .then(result => {
//     console.log(result)
// })

// Todo.putIn('walk dogs', false)
// .then(console.log)
 
Todo.getAll()
.then(console.log)

// Todo.getById(5)
// .then(console.log)

// Todo.takeOutById(4)
// .then(result => console.log(result))