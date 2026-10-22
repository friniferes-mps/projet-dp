CREATE TABLE emotion_game (
  id integer PRIMARY KEY CHECK (id = 1),
  state jsonb NOT NULL
);
