// router.plugin.js

const { readdir } = require("fs");
const path = require("path");
const { configs } = require("../config");

const RouterPlugin = {
  setup(app) {
    readdir(path.join(__dirname, "../routes"), (err, files) => {
      if (err) {
        console.error("Error reading routes directory:", err);
        return;
      }

      files.forEach((filename) => {
        const routeName = path.basename(filename, '.js'); 
        const route=routeName.split(".")[0]// Extract route name from filename
        const router = require(path.join(__dirname, `../routes/${filename}`));
        // Mount router under the API version prefix
        app.use(`/${configs.API_VERSION}/${route}`, router);
        console.log(`Route loaded: http://${configs.HOST}:${configs.PORT}/${configs.API_VERSION}/${route}`);
      });

      // Set up a 404 handler if no routes are found
      app.use((req, res) => {
        res.status(404).json("Route not found");
      });
    });
  },
};

module.exports = {
  RouterPlugin,
};
