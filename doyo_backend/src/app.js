const express=require("express");
const cors=require("cors");
const helmet=require("helmet");
const mongoose=require("mongoose");
const fileUpload=require("express-fileupload");
const { RouterPlugin } = require("./plugins/router.plugin");
const { ListenerPlugin } = require("./plugins/listener.plugin");
const {configs}=require("./config/index")
const app = express();

app
  .use(cors())
  .use(express.json({ limit: "500mb" }))
  .use(express.urlencoded({ extended: true }))
  .use(helmet())
  .use(fileUpload());
async function main() {
  mongoose.connect(configs.DB);
  console.log("db connection successfull");
}
main();
RouterPlugin.setup(app)
ListenerPlugin.listen(app);

