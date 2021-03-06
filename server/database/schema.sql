CREATE TABLE clients (
  user_id       SERIAL PRIMARY KEY,
  email         VARCHAR(50),
);

CREATE TABLE sales (
  sale_id       SERIAL PRIMARY KEY,
  transaction   VARCHAR(50),
  machine       VARCHAR(50),
  card_reader   VARCHAR(50),
  payment_type  VARCHAR(50),
  card_num      VARCHAR(50),
  total_sale    VARCHAR(50),
  num_sold      INT,
  sale_date     VARCHAR(50),
  sale_time     VARCHAR(50),
  email         VARCHAR(50),
);

CREATE TABLE events (
  event_id      SERIAL PRIMARY KEY,
  name          VARCHAR(50),
  day           VARCHAR(50),
  start_time    VARCHAR(50),
  end_time      VARCHAR(50),
  email         VARCHAR(50),
);
