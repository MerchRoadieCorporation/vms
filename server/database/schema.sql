CREATE DATABASE mrvms;

USE mrvms;

CREATE TABLE users (
  userid INT AUTO_INCREMENT NOT NULL,
  email VARCHAR(255),
  PRIMARY KEY (userid)
);

CREATE TABLE sales (
  saleid INT AUTO_INCREMENT NOT NULL,
  device VARCHAR(255),
  total VARCHAR(255),
  numsold INT,
  user VARCHAR(255),
  PRIMARY KEY (saleid)
)
