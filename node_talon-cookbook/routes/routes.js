const categories = require('./categories');
const recipes = require('./recipes');

const appRouter = (app, fs) => {
  app.get('/', (req, res) => {
    res.send("Welcome to cookbook api.");
  });
  categories(app, fs);
  recipes(app, fs);
}

module.exports = appRouter;