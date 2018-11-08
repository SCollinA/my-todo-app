// we want to require pg-promise library
const db = require('./db')
const Todo = require('./Todo')

class User {
    constructor(id, name) {
        this.id = id
        this.name = name
    }

    // Create
    static add(name) {
        return db.one('insert into users (name) values ($1) returning id', [name])
        .then(result => new User(result.id, result.name))
    }
    
    // Retrieve
    static getById(id) {
        return db.one('select * from users where id=$1', [id])
        .then(result => new User(result.id, result.name))
    }

    static getByName(name) {
        return db.any('select * from users where name ilike \'%$1:raw%\'', [name])
        .then(resultsArray => resultsArray.map(result => new User(result.id, result.name)))
    }
    
    static getAll() {
        return db.any('select * from users')
        .then(resultsArray => resultsArray.map(result => new User(result.id, result.name)))
    }

    getTodos() {
        return db.any('select todos.id, todos.name, todos.completed from todos join users_todos ut on todos.id=ut.todo_id join users on ut.user_id=users.id where users.id=$1', [this.id])
        .then(resultsArray => resultsArray.map(result => new User(result.id, result.name)))
        // return db.any('select * from todos where user_id=$1', [this.id])
        // .then(resultsArray => resultsArray.map(result => new Todo(result.id, result.name, result.completed, result.user_id)))
    }
    
    // Update
    updateName(newName) {
        this.name = newName
        return db.result('update users set name=$1 where id=$2', [newName, this.id])
    }

    chooseTodo(todo_id) {
        return db.result('insert into users_todos (user_id, todo_id) values ($1, $2)', [this.id, todo_id])
    }

    removeTodo(todo_id) {
        return db.result('delete from users_todos where user_id=$1 and todo_id=$2', [this.id, todo_id])
    }
    
    // Delete
    delete() {
        // need to make a join to remove references to this user on users_todos
        return db.result('delete from users_todos where user_id=$1', [this.id])
        .then(() => db.result('delete from users where id=$1', [this.id]))
    }
    
    static deleteById(id) {
        return db.result('delete from users_todos where user_id=$1', [id])
        .then(() => db.result('delete from users where id=$1', [id]))
    }
}

module.exports = User