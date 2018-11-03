-- To avoid duplicates for testing only, drop db if exists
DROP DATABASE IF EXISTS notes_db;

-- Create db
CREATE DATABASE notes_db;

-- Specify which db is being used
USE notes_db;

-- Create table for notes
CREATE TABLE notes
(
  id INT NOT NULL AUTO_INCREMENT,
  noteTitle VARCHAR (300) NOT NULL,
  note VARCHAR (300) NOT NULL,
  PRIMARY KEY(id)
);