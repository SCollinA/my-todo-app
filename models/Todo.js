// we want to require pg-promise library
const db = require('./db')

class Todo {
    constructor (id, name, completed) {
        this.id = id
        this.name = name
        this.completed = completed
    }
    
    // create
    static add(name, completed) {
        return db.one('insert into todos (name, completed) values ($1, $2) returning id', [name, completed])
        .then(console.log)
    }
    
    // retrieve
    static getById(id) {
        return db.one(`select * from todos where id=$1`, [id])
        .catch(err => {
            console.log('whaaaaaa?')
            return {
                name: 'no todo found.'
            }
        })
    }

    static getAll() {
        return db.any('select * from todos')
    }

    // update
    assignToUser(user_id) {
        return db.result('update todos set user_id=$1 where id=$2', [user_id, this.id])
    }

    updateName(newName) {
        return db.result('update todos set name=$1 where id=$2', [newName, this.id])
    }
    
    toggleComplete() {
        return db.result('update todos set completed=$1 where id=$2', [!row.completed, this.id])
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