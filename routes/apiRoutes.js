const fs = require('fs');
const shortid = require('shortid');

module.exports = (app) => {

  // Display JSON file
  app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
      if (err) throw err;

      let notesData = JSON.parse(data);
      res.json(notesData);
    });
  });

  // Write to JSON file
  app.post('/api/notes', (req, res) => {
    let newData = {
      title: req.body.title,
      text: req.body.text,
      id: shortid.generate()
    };

    fs.readFile('db/db.json', (err, data) => {
      if (err) throw err;

      let notesData = JSON.parse(data);
      notesData.push(newData);
      newData = JSON.stringify(notesData);
      fs.writeFile('db/db.json', newData, (err) => {
        if (err) throw err;
        res.json(newData);
      });
    });
  });

  // Delete JSON file
  app.delete('/api/notes/:id', (req, res) => {
    const reqID = req.params.id;
    let indexIwant;

    fs.readFile('db/db.json', (err, data) => {
      if (err) throw err;
      let notesData = JSON.parse(data);

      let note = notesData.filter((note) => {
        return note.id === reqID;
      })[0];

      notesData.forEach((item, index) => {
        if(item.id === note.id) {
          indexIwant = index;
        }
      });

      notesData.splice(indexIwant, 1);

      newData = JSON.stringify(notesData);

      fs.writeFile('db/db.json', newData, (err) => {
        if (err) throw err;
      });
      res.json(notesData);
    });
  });
};