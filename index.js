// we want to require pg-promise library
const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'my-todo-app-db'    
});

db.any('select * from todos;')
.then(console.log)