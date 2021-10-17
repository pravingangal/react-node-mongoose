import React, {useRef, forwardRef, useImperativeHandle} from "react";
import {InputControl, LabelControl, ButtonControl, IconControl, LinkCtrl} from "./UserControls";
import GetUniqueKey from "../../../utilities/GetUniqueId";
import {TableContext} from "../DataTable";
import {SEL_ONE_LIST}  from "../tabletypes/CheckBoxTypes";
import {selAllClickedAction} from "../tableactions/TableActions";
import Tableclasses from "../DataTable.module.css";

function ErrFallBack({error,noOfCols})
{
   const TBLERR=(<tbody>
                  <tr key={GetUniqueKey()} className={Tableclasses.tblCenter } >
                      <td colSpan={noOfCols} 
                          key={GetUniqueKey()}>
                          <h5 className={Tableclasses.clsTableErr}>
                              {"Data Error..." + error }
                          </h5>
                      </td>
                  </tr>
                </tbody>
                )
    return TBLERR
}

export const TableHeader= React.memo(({headerData, showCheckBoxes})=>{

const {sendEmails,dispatch,state } = React.useContext(TableContext);
const NOOFCOLS=headerData.length;
const onChange=(event)=>
{         
  dispatch(selAllClickedAction(event.target.checked)); 
}

const onClick=()=>{  
  sendEmails();
}

try{
    return(  
               
          <tr key={GetUniqueKey()}>
                  {showCheckBoxes &&
                      <th key={GetUniqueKey()} >                        
                          <div  key={GetUniqueKey()} className="custom-control custom-checkbox " > 
                                      <InputControl 
                                          key={GetUniqueKey()}
                                          elemID={"selAll"}
                                          onChangeSel={onChange}
                                          selCheckedFlag={state.selAllChecked}
                                          />
                                      <LabelControl 
                                          key={GetUniqueKey()} 
                                          lblText={"Select All"}  
                                          lblFor={"selAll"}  
                                          classNames={Tableclasses.tableLabelPad6}  />&nbsp;
                                      <ButtonControl 
                                          key={GetUniqueKey()} 
                                          btnText={"Action"} 
                                          classNames={Tableclasses.tableSmButton} 
                                          onClick={onClick}/>                                     
                          </div>
                      </th>
                      }
                       { headerData.map((colObj,i)=>   {                                                                                                                    
                                                             return(                                   
                                                                          <th key={GetUniqueKey()} >  
                                                                              {colObj.text}                                                                                                                                                        
                                                                          </th>
                                                             )                                                                                                                                                             
                                                      }
                                    )
                         }
            </tr>            
        );
    }
    catch(error)
    {
        return <ErrFallBack error={error} noOfCols={NOOFCOLS+1} />
    }
});

export const  TableBody= forwardRef( ({noOfCols,showCheckBoxes, superAdminConfigArr},ref)=>{
  const { state } = React.useContext(TableContext);
  const BODYData=useRef([]);
  const tableBodyRef = useRef();
  const tableBodyAPI = {};
 
  tableBodyAPI.getCheckBoxState=()=>{
    return BODYData.current;
  }

  useImperativeHandle(ref, () => tableBodyAPI); 

const onChange=(event)=>
{     
  const index=BODYData.current.findIndex(val=>val.id===event.target.id);
  const newStateArr=[...BODYData.current];
  newStateArr[index]._isChecked=event.target.checked;
  BODYData.current=[...newStateArr];
}

const getControls=(elemConfigObj)=>{

  let NEWCONTROL=null;

  switch(elemConfigObj.type)
  {
    case "LinkControl":
                        NEWCONTROL=(<LinkCtrl key={GetUniqueKey()} 
                                              valText={elemConfigObj.valText} 
                                              classNames={""} 
                                              onClick={elemConfigObj.onClick} />);                       
                        break;
    case "ButtonControl":
                        NEWCONTROL=(<ButtonControl  key={GetUniqueKey()}
                                                    btnText={elemConfigObj.valText} 
                                                    classNames={Tableclasses.tblTopMargin} 
                                                    onClick={()=>{alert("..TBD..")}} />);
                        break;
    default: 
  }

  return NEWCONTROL;
 
}

try{
return( 
   <tbody key={GetUniqueKey()}  ref={tableBodyRef}>     
            {
                    state.bodyDataArr.map
                    (
                        (bodyDataObj,i)=>
                                      {     
                                                                                  
                                          let isCheckedFlag= state.selOneArr[i]["isChecked"];
                                          let emailSent= bodyDataObj["emailSent"];
                                          let emailConfirmed=bodyDataObj["emailConfirmed"]; 
                                          let emailConfirmationErr= bodyDataObj["emailConfirmationErr"];                                       
                                          let emailErr=bodyDataObj["emailErr"];
                                          let emailInfo=bodyDataObj["emailInfo"]; 
                                          
                                           if(state.emailDataArr.length>0)
                                          {                                                                                                                                
                                            const currArr =state.emailDataArr.filter((obj,_)=>{return obj.EmpId===bodyDataObj.id});                                          
                                            if(currArr.length>0)
                                            {                                          
                                              emailSent= currArr[0]["emailSent"];
                                              emailConfirmed=currArr[0]["emailConfirmed"];                                         
                                              emailErr=currArr[0]["emailErr"];
                                              emailInfo=currArr[0]["emailInfo"];                                            
                                            }                                                                                  
                                          }
                                         
                                          if(state.emailConfirmedDataArr.length>0)
                                          {
                                            const currArr =state.emailConfirmedDataArr.filter((obj,_)=>{return obj.EmpId===bodyDataObj.id});                                           
                                            if(currArr.length>0)
                                            {                                             
                                              emailConfirmed=currArr[0]["emailConfirmed"];                                                                                      
                                              emailConfirmationErr =currArr[0]["emailConfirmationErr"];                                          
                                            }                                           
                                          }
                                          
                                          BODYData.current.push({id:SEL_ONE_LIST+i,_isChecked:isCheckedFlag,_id:bodyDataObj.id,_name:bodyDataObj.name,_email:bodyDataObj.email});
                                          return(
                                                    <tr data-row={"d_"+i} key={GetUniqueKey()}>
                                                      {showCheckBoxes  &&
                                                            <td col-header={"Select"} key={GetUniqueKey()}>
                                                              <div className="custom-control custom-checkbox ">                                                              
                                                                  <InputControl 
                                                                    key={GetUniqueKey()}
                                                                    elemID={SEL_ONE_LIST+i}                                           
                                                                    onChangeSel={onChange}                                                                                                                                         
                                                                    selCheckedFlag={isCheckedFlag}                                                                                                                             
                                                                    />                                                                    
                                                                  <LabelControl 
                                                                    key={GetUniqueKey()} 
                                                                    lblText={""}  
                                                                    lblFor={SEL_ONE_LIST+i}  
                                                                    classNames={""}  />
                                                              </div>
                                                            </td>
                                                      }
                                                            {
                                                              Object.values(bodyDataObj).map
                                                              (                                                                
                                                                 (val,k)=>{
                                                                                  let currentConfig=null;
                                                                                  let currentUI=[];
                                                                                  
                                                                                  if(superAdminConfigArr!==null  )
                                                                                  {                                                                                  
                                                                                    currentConfig=superAdminConfigArr[0][val]; 
                                                                                      if(currentConfig)
                                                                                      {
                                                                                            currentConfig.map((elem,_)=>{                                                                                                                                                                                                                                                                                 
                                                                                            currentUI.push(getControls(elem));
                                                                                            currentUI.push(" "); 
                                                                                            return true;                                                                                           
                                                                                          });
                                                                                  }

                                                                                  }
                                                                              
                                                                              return(   (k<noOfCols) &&                                                                            
                                                                                        <td col-header={Object.keys(bodyDataObj)[k]}
                                                                                              key={GetUniqueKey()}>  
                                                                                            {
                                                                                              showCheckBoxes?
                                                                                              (
                                                                                              k===0 ?
                                                                                                    (
                                                                                                      <div className="custom-control ">											
                                                                                                        <span>                                                                                                                                                                                                                   
                                                                                                          {emailSent?"Sent":"Not Sent"} 
                                                                                                            <IconControl 
                                                                                                              iconId={"iconErr_"+i+"_"+k}                                                                                                              
                                                                                                              iconText={emailErr  && emailInfo===null?emailErr:(emailErr===null  && emailInfo===null?"To Be Sent":"")} 
                                                                                                              classNames={emailErr && emailInfo===null?Tableclasses.clsTableErr:(emailErr===null  && emailInfo===null?Tableclasses.clsTableErr:Tableclasses.clsTableNoErr)} />
                                                                                                              <IconControl 
                                                                                                              iconId={"iconInfo_"+i+"_"+k}                                                                                                              
                                                                                                              iconText={emailInfo && emailErr===null?emailInfo:""} 
                                                                                                              classNames={emailInfo && emailErr===null?Tableclasses.clsTableInfo:Tableclasses.clsTableNoErr} />
                                                                                                        </span>
                                                                                                      </div>
                                                                                                    )
                                                                                                    :
                                                                                                    (
                                                                                                      k===1 ?
                                                                                                              (
                                                                                                                <span
                                                                                                                  name={"span_"+i+"_"+k} 
                                                                                                                  id={"span_"+i+"_"+k} >
                                                                                                                    {emailConfirmed?"Confirmed":"Not Confirmed"}
                                                                                                                    &nbsp;
                                                                                                                    <IconControl 
                                                                                                                        iconId={"iconEmailConfirmErr_"+i+"_"+k}                                                                                                              
                                                                                                                        iconText={emailConfirmationErr?emailConfirmationErr:""} 
                                                                                                                        classNames={emailConfirmationErr?Tableclasses.clsTableErr:Tableclasses.clsTableNoErr} />
                                                                                                                    <IconControl 
                                                                                                                        iconId={"iconEmailConfirm_"+i+"_"+k}                                                                                                              
                                                                                                                        iconText={emailConfirmed ?"Email Confirmed By Emp":"To Be Confirmed"} 
                                                                                                                        classNames={emailConfirmed && emailConfirmationErr===null?Tableclasses.clsTableInfo:Tableclasses.clsTableErr} />
                                                                                                                </span>
                                                                                                              )
                                                                                                              :
                                                                                                              (
                                                                                                                 val
                                                                                                              )
                                                                                                                 
                                                                                                    )
                                                                                              ):
                                                                                              val+" "                                                                                              
                                                                                             }
                                                                                             {superAdminConfigArr!==null?currentUI:null}
                                                                                          </td>
                                                                                  
                                                                                    )
                                                                          }
                                                              )
                                                            }
                                                    </tr>
                                                )
                                      }
                    )
            }
        </tbody>  
      )
    }
    catch(error)
    {
        return <ErrFallBack error={error} noOfCols={noOfCols+1}/>
    }
});
