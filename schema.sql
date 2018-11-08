
create table users (
    id serial primary key,
    name text
);

create table todos (
    id serial primary key,
    name text,
    completed boolean
);

create table users_todos (
    id serial primary key,
    user_id integer references users (id),
    todo_id integer references todos (id)
);