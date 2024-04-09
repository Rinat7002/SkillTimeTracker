create table contactrequests (
	id integer PRIMARY KEY autoincrement,
	firstname varchar(255) NOT NULL,
	email varchar(255),
	reqtype varchar(255),
	reqtext varchar(255),
	createdAt datetime,
	updatedAt datetime
);

create table logins (
	id integer PRIMARY KEY autoincrement,
	username varchar(255) NOT NULL UNIQUE,
	email varchar(255) NOT NULL UNIQUE,
	password varchar(255) NOT NULL UNIQUE
);