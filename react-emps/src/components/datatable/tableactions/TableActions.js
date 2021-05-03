import {SELALL}  from "../tabletypes/CheckBoxTypes";
import {EMAIL_SENT,  EMAIL_SENT_ERR,EMAIL_CONFIRMED}  from "../tabletypes/EmailTypes";
import axios from "axios";


export const selAllClickedAction = (isChecked) => {  
  return {type: SELALL,payload: {isChecked:isChecked}} 
};

export const emailDataArrAction=(dataArr)=>{  
  return {type: EMAIL_SENT,payload: {emailDataArr:[...dataArr]}} 
}

export const emailConfirmedAction=(dataObj,selOneCBoxArr)=>{
  return {type: EMAIL_CONFIRMED,payload: {emailConfirmedDataObj:{...dataObj},selOneCBoxArr:selOneCBoxArr}} 
}

export const emailErrAction=(err)=>{
  return {type: EMAIL_SENT_ERR,payload: err} 
}

export const sendEmailAction = (sendEmailData) => {
  return axios.post(
    "http://localhost:4000/empApi/empLoggedInSendEmail",
    sendEmailData
  );
 
  };
