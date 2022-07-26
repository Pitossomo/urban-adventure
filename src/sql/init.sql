CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; /* enables uuid creation */
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; /* enables crypt */

CREATE TABLE IF NOT EXISTS app_user(
  uuid uuid DEFAULT uuid_generate_v4(),   /* creates an unique, non-incremental id for each user */
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  PRIMARY KEY (uuid)
);

/* The values of MY-NAME, MY-PASSWORD & MY-SALT* shall be redefined */
INSERT INTO app_user(username, password) VALUES ('MY-NAME', crypt('MY-PASSWORD', 'MY-SALT'));