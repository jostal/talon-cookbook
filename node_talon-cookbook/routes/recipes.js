
const recipes = (app, fs) => {
  const path = './data/recipes.json';

  app.get('/recipes', (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {throw err}
      res.send(JSON.stringify(data));
    })
  })

  app.put('/recipes', (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {throw err}
      let obj = JSON.parse(data);
      obj["recipes"].push(req.body);
      fs.writeFileSync(path, JSON.stringify(obj));
      res.send(JSON.stringify(obj));
    });
  })

  app.patch('/recipes', (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {throw err}
      let obj = JSON.parse(data);
      obj["recipes"].forEach((recipe, i) => {
        if (recipe.id === req.body.id) {
          obj["recipes"][i] = req.body;
        }
      })
      fs.writeFileSync(path, JSON.stringify(obj));
      res.send(JSON.stringify(obj));
    })
  })

  //actually deletes
  app.post('/recipes', (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {throw err}
      let obj = JSON.parse(data);
      obj["recipes"].forEach((recipe, i) => {
        if (recipe && recipe.id === req.body.id) {
          obj["recipes"].splice(i, 1);
        }
      })
      fs.writeFileSync(path, JSON.stringify(obj));
      res.send(JSON.stringify(obj));
    })
  })


  app.post('/recipes/recipe', (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {throw err}
      let obj = JSON.parse(data);
      let recipe;
      obj["recipes"].forEach((recipe, i) => {
        if (recipe && recipe.id === req.body.id) {
          recipe = obj.recipes[i];
          res.send(JSON.stringify(recipe))
        }
      })
    })
  })
}

module.exports = recipes;