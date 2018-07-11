CREATE DATABASE mrvms;

USE mrvms;

CREATE TABLE sales (
  saleid SERIAL PRIMARY KEY,
  machine VARCHAR(255),
  card_reader VARCHAR(255),
  total_sale VARCHAR(255),
  num_sold INT,
  email VARCHAR(255),
);
