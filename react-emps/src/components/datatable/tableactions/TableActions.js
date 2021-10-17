import {SELALL}  from "../tabletypes/CheckBoxTypes";
import * as emailActionTypes from "../tabletypes/EmailTypes";
import axios from '../../../axios-inst';


export const selAllClickedAction = (isChecked) => {  
  return {type: SELALL,payload: {isChecked:isChecked}} 
};

export const emailDataArrAction=(dataArr)=>{  
  return {type: emailActionTypes.EMAIL_SENT,payload: {emailDataArr:[...dataArr]}} 
}

export const emailConfirmedAction=(dataObj,selOneCBoxArr)=>{
  return {type: emailActionTypes.EMAIL_CONFIRMED,payload: {emailConfirmedDataObj:{...dataObj},selOneCBoxArr:selOneCBoxArr}} 
}

export const emailErrAction=(err)=>{
  return {type: emailActionTypes.EMAIL_SENT_ERR,payload: err} 
}

export const sendEmailAction = (sendEmailData) => {
  return axios.post(   
     "/empApi/empLoggedInSendEmail",
    sendEmailData
  );
 
  };
