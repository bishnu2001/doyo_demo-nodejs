
// import { config } from "dotenv";
// import { config } from "dotenv";
const {config}=require("dotenv")
config();
// import "dotenv/config";


const configs = {
  PORT: process.env.PORT,
  API_VERSION: `api/v1`,
  HOST: process.env.HOST,
  DB: process.env.MONGO_URL,
  SECRET_KEY: `${process.env.SECRET_KEY}`,
};
module.exports={configs}
