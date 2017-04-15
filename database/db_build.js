
const builders = require('./buildTables.js');

builders.buildPlayerTable('newplayers', (error) => {
  if (error) throw error;
  console.log('Player table made');
  builders.buildRoundsTable((err) => {
    if (err) throw err;
    console.log('round table made');
    process.exit(0);
  });
});
