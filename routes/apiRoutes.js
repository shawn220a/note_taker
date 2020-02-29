const fs = require('fs');

module.exports = (app) => {

  app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
      if (err) throw err;
      let notesData = JSON.parse(data);
      res.json(notesData);
    });
  });

  app.post('/api/notes', (req, res) => {
    console.log(req.body);
  });

  // app.delete('/api/notes/:id', (req, res) => {

  // });
};