module.exports = (app) => {

  app.get('/api/notes', (req, res) => {
    res.json(notesData);
  });

  app.post('/api/notes', (req, res) => {
    console.log(req.body);
  });

  // app.delete('/api/notes/:id', (req, res) => {

  // });
};