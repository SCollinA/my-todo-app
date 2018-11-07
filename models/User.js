// we want to require pg-promise library
const db = require('./db')
const Todo = require('./Todo')

class User {
    constructor(id, name) {
        this.name = name
        this.id = id
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
    
    static getAll() {
        return db.any('select * from users')
        .then(resultsArray => resultsArray.map(result => new User(result.id, result.name)))
    }

    getTodos() {
        return db.any('select * from todos where user_id=$1', [this.id])
        .then(resultsArray => resultsArray.map(result => new Todo(result.id, result.name, result.completed, result.user_id)))
    }
    
    // Update
    updateName(newName) {
        this.name = newName
        return db.result('update users set name=$1 where id=$2', [newName, this.id])
    }
    
    // Delete
    delete() {
        return db.result('delete from users where id=$1', [this.id])
    }
    
    static deleteById(id) {
        return db.result('delete from users where id=$1', [id])
    }
}

module.exports = User
// {
//     addUser,
//     getAllUsers,
//     getUserById,
//     updateUserNameById,
//     deleteUserById,
//     getTodosForUser,
// }