const dbConnection = require('./db_connection.js');

const buildPlayerTable = (name, cb) => {
  const build = `DROP TABLE IF EXISTS ${name}, rounds; CREATE TABLE ${name} (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    score INTEGER,
    dealer BOOLEAN
  );`;
  console.log(build);
  dbConnection.query(build, cb);
};

const buildRoundsTable = (cb) => {
  const build = `CREATE TABLE rounds (
    id INTEGER PRIMARY KEY,
    round_id INTEGER,
    player_id INTEGER references players (id) NOT NULL,
    tricks_bid INTEGER,
    tricks_won INTEGER
  );`;
  console.log(build);
  dbConnection.query(build, cb);
};

module.exports = { buildRoundsTable, buildPlayerTable };
