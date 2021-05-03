import {SEL_ONE_REFRESH, SEL_ONE_LIST}  from "../tabletypes/CheckBoxTypes";
import {EMAIL_SENT, EMAIL_SENT_ERR, EMAIL_CONFIRMED}  from "../tabletypes/EmailTypes";
import decode from "jwt-decode";
import jwt from "jsonwebtoken";


export default function  tableCboxReducer  (state, action)  {
  const newState = { ...state };
  const tokenLoad = decode(localStorage.refreshJWToken); 
  const JSONWT_SEC_KEY="secretkey";
  const get_JSON_WEB_TOKEN=(tokenObj)=>{
    return jwt.sign({...tokenObj},JSONWT_SEC_KEY);
  }

  
  switch (action.type) {
    case "SELALL":      
      let newSelOneArr=[...state.selOneArr];
      newSelOneArr.map((obj,_)=>obj.isChecked=action.payload.isChecked);     
      return {
        ...state,
        selAllChecked: action.payload.isChecked,   
        selOneArr:[...newSelOneArr],
        emailDataArr: [], 
        emailErr:null,          
      };
      case EMAIL_SENT:      
        const newBodyDataArr=[...state.bodyDataArr];
        const NEWSELONEARR=[...state.selOneArr];
        NEWSELONEARR.forEach((obj)=>{obj.isChecked=false;})
        action.payload.emailDataArr.forEach((obj)=>{           
          let index=state.bodyDataArr.findIndex(val=>{return  val.id===obj.EmpId});          
          newBodyDataArr[index]["emailErr"]=obj.emailErr;
          newBodyDataArr[index]["emailInfo"]=obj.emailInfo;
          newBodyDataArr[index]["emailSent"]=obj.emailSent; 
          newBodyDataArr[index]["emailConfirmed"]=false;
          newBodyDataArr[index]["emailConfirmationErr"]=null;
          index=state.selOneArr.findIndex(val=>{return  val.EmpId===obj.EmpId});         
          NEWSELONEARR[index]["isChecked"]=true;

          if(parseInt(tokenLoad.id)===parseInt(obj.EmpId))
          {
            localStorage.removeItem("refreshJWToken");
            tokenLoad.emailErr=obj.emailErr;
            tokenLoad.emailInfo=obj.emailInfo;
            tokenLoad.emailSent=obj.emailSent;
            tokenLoad.emailConfirmed=obj.emailConfirmed;
            tokenLoad.emailConfirmationErr=obj.emailConfirmationErr;
            localStorage.refreshJWToken =get_JSON_WEB_TOKEN(tokenLoad);            
          }

        });       
        return {
          ...state,
          emailDataArr: action.payload.emailDataArr,   
          emailErr:null ,
          bodyDataArr: [...newBodyDataArr],
          selOneArr:[...NEWSELONEARR], 
        };
      case EMAIL_SENT_ERR:
        return {
          ...state,
          emailDataArr: [],   
          emailErr:action.payload.emailErr     
        };
      case EMAIL_CONFIRMED:     
      const newEmailConfirmedDataArr=[...state.emailConfirmedDataArr];
      const index=newEmailConfirmedDataArr.findIndex(val=>{return  val.EmpId===action.payload.emailConfirmedDataObj.EmpId}); 
      if(index>-1)
      {
        newEmailConfirmedDataArr[index]["emailConfirmed"]=action.payload.emailConfirmedDataObj.emailConfirmed;
        newEmailConfirmedDataArr[index]["emailConfirmationErr"]=action.payload.emailConfirmedDataObj.emailConfirmationErr;        
      }
      else
      {        
        newEmailConfirmedDataArr.push(action.payload.emailConfirmedDataObj);
      }     
      const _newSelOneArr=[...state.selOneArr];
      
      action.payload.selOneCBoxArr.forEach((val)=>{        
        const index=_newSelOneArr.findIndex(selOneVal=>{return  selOneVal.id===val.id});  
        if(index>-1)
        {
          _newSelOneArr[index]["isChecked"]=val._isChecked;
        }          
      });

        const indexToken=newEmailConfirmedDataArr.findIndex(val=>{return  parseInt(val.EmpId)===parseInt(tokenLoad.id)});
        if(indexToken>-1)
        {
          localStorage.removeItem("refreshJWToken");
          tokenLoad.emailConfirmed=action.payload.emailConfirmedDataObj.emailConfirmed;
          tokenLoad.emailConfirmationErr=action.payload.emailConfirmedDataObj.emailConfirmationErr;
          localStorage.refreshJWToken =get_JSON_WEB_TOKEN(tokenLoad);          
        } 

        return {
          ...state,
          emailConfirmedDataArr: [...newEmailConfirmedDataArr], 
          selOneArr: [..._newSelOneArr]                        
        };     
    default:
      return newState;
  }

};

export const  InitStateCBox= (colsBodyData) => {  
  const getSelOneArr=()=>
  {
    const selOneArr=[];  
    if(colsBodyData.length===undefined)
    {
      selOneArr.push({id:SEL_ONE_REFRESH,EmpId:colsBodyData.id,isChecked:false})
    }
    else
    {
      for(let i=0;i<colsBodyData.length;i++)
      selOneArr.push({id:SEL_ONE_LIST+i,EmpId:colsBodyData[i].id,isChecked:false})
    }

    return selOneArr;
  }
  
  const bodyDataArr=colsBodyData && colsBodyData.length ===undefined?[{...colsBodyData}]:[...colsBodyData]; 

        const initState = {
          selAllChecked:false,
          selOneArr: getSelOneArr(),
          emailDataArr:[],
          emailErr:null,
          bodyDataArr: bodyDataArr,
          emailConfirmedDataArr :[]       
        };    
  return(initState);     
  };
