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
    let newData = req.body;
    fs.readFile('db/db.json', (err, data) => {
      if (err) throw err;
      let notesData = JSON.parse(data);
      notesData.push(newData);
      newData = JSON.stringify(notesData);
      fs.writeFile('db/db.json', newData, (err) => {
        if (err) throw err;
      });
    });
  });

  // app.delete('/api/notes/:id', (req, res) => {

  // });
};