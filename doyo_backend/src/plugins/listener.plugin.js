const http = require("http");
const {configs}=require('../config/index')
const ListenerPlugin = {
  listen(app) {
    const server = http.createServer(app);
    server.listen(configs.PORT, () => {
      console.log(`\n server running on port ${configs.PORT}`);
    });
  },
};

module.exports = { ListenerPlugin };
