CREATE DATABASE mrvms;

USE mrvms;

CREATE TABLE sales (
  saleid INT PRIMARY KEY NOT NULL,
  device VARCHAR(255),
  total VARCHAR(255),
  numsold INT,
  email VARCHAR(255),
);

CREATE TABLE sales (
  sale_id     SERIAL PRIMARY KEY,
  device     VARCHAR(50),
  total      VARCHAR(50),
  numsold     INT,
  email       VARCHAR(50)
);
