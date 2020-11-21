import express from "express";
import mongoose from "mongoose";
import empLoggedInRouter from "../routers/empLoggedInRouter";


const dispatchRouter = express.Router();

dispatchRouter.post("/*", (req, res) => {
  
  switch (req.path) {
    case "/empLoggedIn":
      empLoggedInRouter(req, res);
      break;

    default:
  }
});

export default dispatchRouter;
