import express from "express";
import http from "http";
import msgSocketConnect from "./connections/socketConnect";
import dbConnect from "./connections/dbConnect";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const httpServer = http.createServer(app);
let empDb = null;

dbConnect()
  .then((db) => {
    empDb = db;
  })
  .catch((err) => {
    empDb = null;
  });

app.get("/*", (request, response) => {
  response.sendFile("index.html", { root: __dirname });

  if (response.writableEnded) {
    response.end();
  }
});

httpServer.listen(4000, () => {
  console.log("Server started on port 4000");
  msgSocketConnect(httpServer);
});
