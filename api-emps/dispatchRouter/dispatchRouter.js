import express from "express";
import mongoose from "mongoose";
import empLoggedInRouter from "../routers/empLoggedInRouter";
import empLoggedinSendEmailRouter  from "../routers/empLoggedinSendEmailRouter";
import empConfirmedEmailRouter  from "../routers/empConfirmedEmailRouter";


const dispatchRouter = express.Router();

dispatchRouter.post("/*", (req, res) => {
  
  switch (req.path) {
    case "/empLoggedIn":
      empLoggedInRouter(req, res);
      break;
    case "/empLoggedInSendEmail":
      empLoggedinSendEmailRouter(req, res);
      break;
    case "/empConfirmedEmail":
      empConfirmedEmailRouter(req, res);
      break;
    default:
  }
});

export default dispatchRouter;
