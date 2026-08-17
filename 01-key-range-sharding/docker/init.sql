-- Executado automaticamente pelo Postgres na primeira subida de cada container
-- (docker-entrypoint-initdb.d). Mesma estrutura nos 3 shards (db_a, db_b, db_c).

CREATE TABLE IF NOT EXISTS orders (
  id         INTEGER PRIMARY KEY, -- sem SERIAL: o id é decidido/fornecido antes do insert
  client     VARCHAR(255) NOT NULL,
  value      NUMERIC(10, 2) NOT NULL,
  created_at DATE NOT NULL
);
