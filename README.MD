# The pracetice project for udemy course
**Amazing Face Recognition API**
[Course: The Complete Web Developer in 2018: Zero to Mastery](https://www.udemy.com/the-complete-web-developer-in-2018/learn/v4/content)
## Table schema

### USERS
```
create table users (
	id serial PRIMARY key,
	name varchar(100),
	email text UNIQUE not null,
	entries bigint default 0,
	joined timestamp not null
)
```

### LOGIN
```
create table login (
	id serial PRIMARY key,
	hash varchar(100) not null,
	email text unique not null
)
```
