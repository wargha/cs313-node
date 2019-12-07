DROP TABLE USERS;

CREATE TABLE USERS
(
	id SERIAL PRIMARY KEY NOT NULL,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100),
	username VARCHAR (100) NOT NULL,
	pw VARCHAR (255) NOT NULL
);


INSERT INTO USERS (first_name, last_name, username, pw)
VALUES ('Lucas', 'Wargha','wargha', '1234');


CREATE TABLE bucket
(
	id SERIAL PRIMARY KEY NOT NULL,
	bucket_name VARCHAR(100) NOT NULL,
	bucket_owner INT NOT NULL REFERENCES users(id)
);

INSERT INTO bucket (bucket_name, bucket_owner)
VALUES ('Visit Japan', 1);