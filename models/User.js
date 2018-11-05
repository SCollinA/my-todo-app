// we want to require pg-promise library
const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'my-todo-app-db'    
});

// Create
function addUser(name) {
    return db.result('insert into users (name) values ($1)', [name])
}

// Retrieve
function getAllUsers() {
    return db.any('select * from users')
    .catch(err => {
        console.log('whaaaaaa?')
        return {
            name: 'no todo found.'
        }
    })
}

function getUserById(id) {
    return db.one('select * from users where id=$1', [id])
}

// Update
function updateUserNameById(newName, id) {
    return db.result('update users set name=$1 where id=$2', [newName, id])
}

// Delete
function deleteUserById(id) {
    return db.result('delete from users where id=$1', [id])
}

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    updateUserNameById,
    deleteUserById
}