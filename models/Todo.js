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

// getAll()
// .then(console.log)


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

// getById(5)
// .then(console.log)


// add row
function putIn(name, completed) {
    return db.one(`insert into todos (name, completed) values ($1, $2) returning id`, [name, completed])
}

// putIn('walk dogs', false)
// .then(console.log)


// update row
function toggleCompleteById(id) {
    return db.one('select * from todos where id=$1', [id])
    .then(row => {
        const isComplete = row.completed
        db.result('update todos set completed=$2 where id=$1', [id, !isComplete])
        .then(console.log)
    })
}

function updateNameById(id, newName) {
    return db.result('update todos set name=$2 where id=$1', [id, newName])
}

toggleCompleteById(4)
.then(result => {
    console.log(result.rowCount)
})


// delete row
function takeOutById(id) {
    return db.result(`delete from todos where id=$1`, [id])
}

// takeOutById(4)
// .then(result => console.log(result.rowCount))

module.exports = {
    add,
    getAll,
    getById,
    putIn,
    updateNameById,
    toggleCompleteById,
    takeOutById
}