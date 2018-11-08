// we want to require pg-promise library
const db = require('./db')
const User = require('./User')

class Todo {
    constructor (id, name, completed) {
        this.id = id
        this.name = name
        this.completed = completed
    }
    
    // create
    static add(name, completed) {
        return db.one('insert into todos (name, completed) values ($1, $2) returning id', [name, completed])
        .then(result => new Todo(result.id, result.name, result.completed))
    }
    
    // retrieve
    static getById(id) {
        return db.one(`select * from todos where id=$1`, [id])
        .then(result => new Todo(result.id, result.name, result.completed))
    }

    static getByName(name) {
        return db.any('select * from todos where name ilike "%$1:raw%"', [name])
        .then(resultsArray => resultsArray.map(result => new Todo(result.id, result.name, result.completed)))
    }

    static getAll() {
        return db.any('select * from todos')
        .then(resultsArray => resultsArray.map(result => new Todo(result.id, result.name, result.completed)))
    }

    getUsers() {
        return db.any('select users.id, users.name from users join users_todos ut on users.id=ut.user_id join todos on ut.todo_id=todos.id where todos.id=$1', [this.id])
        .then(resultsArray => resultsArray.map(result => new User(result.id, result.name)))
        // return db.any('select * from links where todo_id=$1', [this.id])
        // .then(resultsArray => Promise.all(resultsArray.map(result => User.getById(result.id))))
    }

    // update  
    updateName(newName) {
        this.name = newName
        return db.result('update todos set name=$1 where id=$2', [newName, this.id])
    }
    
    assignToUser(user_id) {
        // this.user_id = user_id
        return db.result('insert into users_todos (user_id, todo_id) values ($1, $2)', [user_id, this.id])
    }

    removeFromUser(user_id) {
        return db.result('delete from users_todos where user_id=$1 and todo_id=$2', [user_id, this.id])
    }

    toggleComplete() {
        this.completed = !this.completed
        return db.result('update todos set completed=$1 where id=$2', [this.completed, this.id])
    }

    // delete
    delete() {
        return db.result('delete from users_todos where todo_id=$1', [this.id])
        .then(() => db.result(`delete from todos where id=$1`, [this.id]))
    }

    static deleteById(id) {
        return db.result('delete from users_todos where todo_id=$1', [id])
        .then(() => db.result(`delete from todos where id=$1`, [id]))
    }

}

module.exports = Todo