if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
    app.get('*', (req, res) => {
      res.sendFile(path.join('build', 'index.html'));
    });
  }

  var PORT = process.env.PORT || 3001;
  app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
  });

