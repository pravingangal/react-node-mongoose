import React,{useRef, useEffect} from "react";
import  GetUniqueKey  from "../../utilities/GetUniqueId";
import  {TableHeader, TableBody} from "./usercontrols/TableControls";
import TableCboxReducer,{InitStateCBox} from "./tablereducers/TableCboxReducer";
import Tableclasses from "./DataTable.module.css";
import {emailDataArrAction, emailErrAction, sendEmailAction, emailConfirmedAction} from "./tableactions/TableActions";
import socketIOClient from "socket.io-client"; 

export const TableContext = React.createContext();

const  dataTable= React.memo(({colsHeaderData, colsBodyData, noOfCols,showCheckBoxes,superAdminConfigArr}) => {  

const refDataTable=useRef(); 
const [state, dispatch] = React.useReducer(TableCboxReducer, InitStateCBox(colsBodyData));
const APIURL= "http://127.0.0.1:4000";

useEffect(()=>{ 
    
    let socket = socketIOClient(APIURL);    
    socket.on("connect",()=>{});

    socket.on("emailConfirmed", (emailConfirmedDataObj) => {                                 
                                  const SELONE_CBOX_CURRENT_STATE=refDataTable.current.getCheckBoxState();                                  
                                  dispatch(emailConfirmedAction(emailConfirmedDataObj,SELONE_CBOX_CURRENT_STATE)); 
      													});
      											
   socket.on("disconnect",()=>{})
   return ()=>{     
      if (socket) socket.close();
        socket = null;  
        
   }
  
   },[]
   );


 const sendEmails=async ()=>{

  const emailDataArrNew= [...refDataTable.current.getCheckBoxState()].filter((obj,i)=>{
    return obj._isChecked;
  }).reduce((prev,curr)=>{    
    return prev.concat({"EmpId":curr._id,"EmpName":curr._name,"Email":curr._email})         
 },[]);
  if(emailDataArrNew.length===0)alert("Pl Select Checkbox");
  else
  {    
  
    sendEmailAction(emailDataArrNew).then((res)=>{                                                   
                                                  dispatch(emailDataArrAction([...res.data]));                                                                                                     
                                              }
                                    ).catch((e)=>
                                    {                                      
                                      dispatch(emailErrAction(e));                                    
                                    });
  }
}
 
 
 
return(                 
        <div className={Tableclasses.tblFlexContainer + " " + Tableclasses.tblResp} key={GetUniqueKey()}>
         
        <h3 className={Tableclasses.clsTableErr}>{state.emailErr }</h3>           
          <TableContext.Provider
                value={{                  
                  sendEmails,dispatch,state
                }}
            >                                 
                <table key={GetUniqueKey()} className={"table table-bordered table-striped " +  Tableclasses.tableMarginTop} >
                <thead key={GetUniqueKey()} className={showCheckBoxes?"":Tableclasses.theadNoShow}>
                  <TableHeader key={GetUniqueKey()} headerData={colsHeaderData} showCheckBoxes={showCheckBoxes}
                   />
                </thead>                                                         
                      <TableBody  key={GetUniqueKey()} noOfCols={noOfCols} ref={refDataTable} 
                       showCheckBoxes={showCheckBoxes} 
                       superAdminConfigArr={superAdminConfigArr} />                                                                                                                          
                </table>
              </TableContext.Provider>             
        </div>                   
       );     
});
export default dataTable;
