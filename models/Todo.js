// we want to require pg-promise library
const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'my-todo-app-db'    
});


function getAll() {
    return db.any('select * from todos;')
}


// grab row
function getById(id) {
    return db.one(`select * from todos where id=$1`, [id])
    .catch(err => {
        console.log('whaaaaaa?')
        return {
            name: 'no todo found.'
        }
    })
}


// add row
function putIn(name, completed) {
    return db.one(`insert into todos (name, completed) values ($1, $2) returning id`, [name, completed])
}


// update row
function toggleCompleteById(id) {
    return getById(id)
    .then(row => {
        db.result('update todos set completed=$2 where id=$1', [row.id, !row.completed])
        .then(console.log)
    })
}


function updateNameById(id, newName) {
    return db.result('update todos set name=$2 where id=$1', [id, newName])
}


// delete row
function takeOutById(id) {
    return db.result(`delete from todos where id=$1`, [id])
}


module.exports = {
    putIn,
    getAll,
    getById,
    updateNameById,
    toggleCompleteById,
    takeOutById
}