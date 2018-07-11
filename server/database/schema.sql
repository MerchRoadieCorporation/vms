CREATE TABLE sales (
  sale_id       SERIAL PRIMARY KEY,
  machine       VARCHAR(50),
  card_reader   VARCHAR(50),
  total_sale    VARCHAR(50),
  num_sold      INT,
  email         VARCHAR(50)
);
