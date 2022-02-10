
const categories = (app, fs) => {
  const path = './data/categories.json';

  app.get('/categories', (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      res.send(JSON.stringify(data));
    })
  })

  app.put('/categories', (req, res) => {
    console.log("Creating category: " + req.body.categoryName);
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {throw err}
      let obj = JSON.parse(data);
      obj["categories"].push(req.body);
      fs.writeFileSync(path, JSON.stringify(obj));
      res.send(JSON.stringify(obj));
    });
  })

  app.patch('/categories', (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {throw err}
      let obj = JSON.parse(data);
      obj["categories"].forEach((category, i) => {
        if (category.id === req.body.id) {
          obj["categories"][i] = req.body;
        }
      })
      fs.writeFileSync(path, JSON.stringify(obj));
      res.send(JSON.stringify(obj));
    })
  })

  //actually deletes
  app.post('/categories', (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {throw err}
      let obj = JSON.parse(data);
      obj["categories"].forEach((category, i) => {
        if (category && category.id === req.body.id) {
          obj["categories"].splice(i, 1);
        }
      })
      fs.writeFileSync(path, JSON.stringify(obj));
      res.send(JSON.stringify(obj));
    })
  })
}

module.exports = categories;