CREATE TABLE users (
  id SERIAl PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  hashed_password VARCHAR(255) NOT NULL
);
--@block
CREATE TABLE campaigns (
  id SERIAl PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  campaign_name VARCHAR(255) NOT NULL
);
--@block
CREATE TABLE texts (
  id SERIAl PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  campaign_id INT REFERENCES campaigns(id) ON DELETE CASCADE,
  content VARCHAR(255) NOT NULL,
  send_day INT NOT NULL,
  send_hour INT NOT NULL,
  send_minute INT NOT NULL
);
--@block
CREATE TABLE contacts (
  id SERIAl PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  time_zone VARCHAR(255) NOT NULL
);
--@block
CREATE TABLE scheduled_texts (
  id SERIAl PRIMARY KEY,
  contact_id INT REFERENCES contacts(id) ON DELETE CASCADE,
  text_id INT REFERENCES texts(id) ON DELETE CASCADE,
  send_date VARCHAR(255) NOT NULL
);