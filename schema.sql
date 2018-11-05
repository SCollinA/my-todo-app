
create table todos (
    id serial primary key,
    name text,
    completed boolean
);

create table users (
    id serial primary key,
    name text
);