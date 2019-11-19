CREATE TABLE person
(
	id SERIAL PRIMARY KEY NOT NULL,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100),
	birthdate date
);