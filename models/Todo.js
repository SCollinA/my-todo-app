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

    static getAll() {
        return db.any('select * from todos')
        .then(resultsArray => resultsArray.map(result => new Todo(result.id, result.name, result.completed)))
    }

    getUsers() {
        return db.any('select * from links where todo_id=$1', [this.id])
        .then(resultsArray => Promise.all(resultsArray.map(result => User.getById(result.id))))
    }

    // update
    assignToUser(user_id) {
        this.user_id = user_id
        return db.one('update links set user_id=$1 where id=$2 returning id', [user_id, this.id])
    }

    updateName(newName) {
        this.name = newName
        return db.result('update todos set name=$1 where id=$2', [newName, this.id])
    }
    
    toggleComplete() {
        this.completed = !this.completed
        return db.result('update todos set completed=$1 where id=$2', [this.completed, this.id])
    }

    // delete
    delete() {
        return db.result(`delete from todos where id=$1`, [this.id])
    }

    static deleteById(id) {
        return db.result(`delete from todos where id=$1`, [id])
    }

}

module.exports = Todo
// {
//     putIn,
//     getAll,
//     getById,
//     assignToUser,
//     updateNameById,
//     toggleCompleteById,
//     takeOutById,
// }