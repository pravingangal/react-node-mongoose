import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./DashboardPage.css";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { empLoginSendEmailAction } from "../../actions/EmpLoginAction";
import FetchData from "../../apiemps_serverops/FetchData";
import {checkAPIServerConnection} from "../../apiemps_serverops/FetchData";
import store from "../../store/store";
import {empLoggedInSendEmailErr} from "../../actions/EmpLoginAction";
import EmpsSpinner from "../../utilities/EmpsSpinner";
import $ from "jquery";

class DashboardPage extends Component {
  constructor(props) {
    super();
    this.state = {
      empCols: [],
      adminCols: [],
      errs:{},  
      selAllChecked:false,
      selOneChecked:{}, 
      bulkEmailErrFlag:false,  
      loading:false ,
      empEmailConfirmationIDArr:[]      
    };
    this.url="http://localhost:3000/data/data.json";
    this.apiURL="http://127.0.0.1:4000/";     
  }  
  componentDidMount()
  {    
    FetchData(this.url).then((res)=>{
    this.setState({empCols:[...res.empCols],adminCols:[...res.adminCols]})
    }).catch((errs)=>{
      this.setState({errs:errs})
    });    
    
   if(typeof window!=="undefined")
    {      
      window.addEventListener("storage",e=>{       
        const tempID=localStorage.getItem("empEmailConfirmationID");  
           
        if(!!this.state.empEmailConfirmationIDArr.includes(tempID.toString().trim())===false  && tempID.trim()!=="")
          this.setState({empEmailConfirmationIDArr:[...this.state.empEmailConfirmationIDArr,tempID]});        
      });
     
   }
  }
   componentWillUnmount()
   {    
    this.setState({empEmailConfirmationIDArr:[]});    
     if(typeof window!=="undefined")
    {
        window.removeEventListener("storage",()=>{
        localStorage.removeItem("empEmailConfirmationID"); 
     });
    }
   }
  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.empEmailsLoading!==prevState.empEmailsLoading){
      return { empEmailsLoading: nextProps.empEmailsLoading};
   }
   else return null;
  }  
  componentDidUpdate(prevProps, prevState) {  
    if(prevProps.empEmailsLoading!==this.props.empEmailsLoading){        
      this.setState({loading: false});  
    }
  }
showMsg=()=>{
    alert("...TBD...")}
sendEmail=(event)=>{      
      event.preventDefault();
      this.setState({...this.state, loading:true});
      checkAPIServerConnection(this.apiURL)
      .then((res) => 
      {
            if (res.status === 200) 
            {          
                  let JQUERY=$.noConflict();
                  let emailArr=[];                               
                  document.querySelectorAll("table.tblflexSuper.tblsuper tbody tr[data-row*='d_'] ").forEach((elem,index)=>{                
                  let cBox=JQUERY(elem).find("input[id*='selOne']");                  
                    if(cBox.prop("checked"))
                    {
                      let tdEmail=JQUERY(elem).find("td[col-header='Email']");
                      let tdEmpID=JQUERY(elem).find("td[col-header='Emp ID']");
                      let tdEmpName=JQUERY(elem).find("td[col-header='Emp Name']");                        
                      const myEmpObj={"EmpId":tdEmpID.prop("textContent"),"EmpName":tdEmpName.prop("textContent"),"Email":tdEmail.prop("textContent")}
                      emailArr.push(myEmpObj);
                    };                                   
                }              
                );                 
                if(emailArr.length===0)
                {
                  alert("Please Select Emp For Sending Email...");
                  this.setState({...this.state, loading:false});
                }  
                else
                    {          
                        this.props.empLoginSendEmailAction(emailArr); 
                    }

          }
          else
          {
            store.dispatch(empLoggedInSendEmailErr({empsError: "Internal Server Error"}));
            this.setState({...this.state, loading:false});
          }          
          
      }
      ).catch((err)=>{
        store.dispatch(empLoggedInSendEmailErr({empsError: "Internal Server Error"}));
        this.setState({...this.state, loading:false});
      })
    }

    handleCheckChange=(event)=>{    
   this.setState({selOneChecked:{...this.state.selOneChecked,[event.target.name]:!this.state.selOneChecked[event.target.name]}});     
    }
    handleCheckChangeAll=()=>{}
    handleCheckClick=(event)=>
    {      
     let tempObj={};     
        if(event.target.id.toString().search("selAll")===0  && event.target.checked )
        {         
         document.querySelectorAll("input[id*='selOne']").forEach(elem=>{                   
           tempObj[elem.id]=true;           
          });         
         this.setState( {...this.state,selAllChecked:true,selOneChecked:{...tempObj }});
        }
        if(event.target.id.toString().search("selAll")===0  && !event.target.checked )
        {         
         document.querySelectorAll("input[id*='selOne']").forEach(elem=>{
          tempObj[elem.id]=false;
        });         
         this.setState( {...this.state,selAllChecked:false,selOneChecked:{...tempObj }});
        }
    }
   render()
   {
    const { empValidated,empsArr,role,SUPER_ADMIN,emailSentArr,empEmailErrors,empEmailConfirmed } =this.props;
    const{loading}=this.state;
    const EMPSCOLS=[...this.state.empCols];
    const ADMINCOLS=[...this.state.adminCols];
    let emailArrCtr=0;
    const CAPTION="Role.."+role;
    const ERR=empEmailErrors?"Email Send Err.."+empEmailErrors:"";
    return (  
                       
    <div className="container marginTop "  >
       
       <div className="  captionDiv " table-header={CAPTION} err-header={ERR}></div>  
       <span className="dashBoardSpinner">{loading?<EmpsSpinner spinType={"SM"} msg={"Sending..."} />:null}</span>    
          
    {empValidated && SUPER_ADMIN  && role==="Super" ?
    (

//*********admin admin start********************************* */
               <table className="tblflexSuper tblsuper"  >
                
                 <thead >
                     <tr >
                         <th key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()}>Role</th>
                         <th key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()}>Name</th>
                         <th key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()}>Upload Xls</th>
                         <th key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()}>Emps in Dbase</th>
                     </tr>
                 </thead>
                 <tbody >
                     <tr >
                         <td col-header="Role" key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()}>Super - Admin</td>
                         <td col-header="Name" key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()}>Admin</td>    
                         <td col-header="Upload Xls" key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()}><Link key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()} to='/upload' className="btn btn-primary ">Upload Xls</Link></td> 
                         <td col-header="Emps in Dbase" key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()}>
                           <button key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()} onClick={this.showMsg}
                           className="btn btn-primary ">
                             Emps 0-Refresh
                           </button>
						   &nbsp;
						   <button key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()} onClick={this.showMsg}
                           className="btn btn-primary ">
                            Emps-List
                           </button>
                         </td>           
                     </tr>
                 </tbody>
                 </table>
//*********admin admin end********************************* */
   ):
             (
//*********emp super or admin start********************************* */
                 empValidated && !SUPER_ADMIN  && (role==="Super" || role==="Admin") ?
               (			   		
                <table  className="tblflexSuper tblsuper" >
                 
                <thead >
                                    <tr  >
                                    {
                                         ADMINCOLS.map((colObj,i)=>   {
                                           
                                                                    return(
                                                                                
                                                                                  <th key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()}>
                                                                                    {i===0?  
                                                                                    

                                                                                    <div className="custom-control custom-checkbox">                                                                                
                                                                                    <input type="checkbox" className='custom-control-input'   onClick={this.handleCheckClick} key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()} id="selAll" name="selAll" checked={this.state.selAllChecked} onChange={this.handleCheckChangeAll} />                                                                                   
                                                                                    <label className="custom-control-label labelPad6" htmlFor="selAll">{"All Emails"}</label> 
                                                                                    <button key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()} className='btn btnsm btn-primary smButton' onClick={this.sendEmail}>{"Send"}
                                                                                    </button>
                                                                                    </div>  
                                                                                                                                                        
                                                                                    :
                                                                                    colObj.text 
                                                                                    }
                                                                                  </th>
                                                                               
                                                                             )  
                                                                                                                    

                                                                }
                                                    )
                                      }
                                       </tr>
                  </thead>                  
                  <tbody >                                     
                    {										  
									   empsArr && empsArr.length ===undefined ?
									   (                                           
											<tr data-row="d_0">
													<td col-header={"All Emails"} key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()}>                                                      
                            <div className="custom-control custom-checkbox paddingSM">                                                                                                                                                               
                            <input type="checkbox"  className='custom-control-input ' key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()} id="selOne2" name="selOne2" checked={this.state.selOneChecked["selOne2"]} onChange={this.handleCheckChange}  />
                            <label className="custom-control-label " htmlFor="selOne2">{(emailSentArr[0] &&  emailSentArr[0].emailSent===true)?"Sent":(emailSentArr[0] && emailSentArr[0].emailErr?(<React.Fragment><span>{"Not Sent "}</span><i title={emailSentArr[0].emailErr} className='fa fa-exclamation-triangle clsErr'></i></React.Fragment>):("Not Sent"))}</label>
                            <button key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()} className='btn btnsm btn-primary smButton2' onClick={this.sendEmail}>{"Send"}
                            </button>
                            </div>                                                     
                            </td>
													<td col-header={"Email Confirmed?"} key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()}>
                          <span className="paddingSM"></span>
                            {(emailSentArr[0] &&  emailSentArr[0].emailConfirmed===true)||(empsArr.emailConfirmed===true)||(empEmailConfirmed===true) || (emailSentArr[0]  && this.state.empEmailConfirmationIDArr.includes(empsArr["id"])  && emailSentArr[0].emailSent===true) ?"Confirmed":"Not Confirmed.."}                            
                          </td>
											{
													Object.values(empsArr).map
																	 ((val,k)=>
																	 {                                      
																		let colHeader=ADMINCOLS[k+2]?ADMINCOLS[k+2]["col-header"]:"none"; 
																		return k<9? (<td className="paddingSM" col-header={colHeader} key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()}>
																					<span className="paddingSM"></span>
                                          {val}																			
                                        </td>):(null)
                                                                                
                                   })
                                                                     
													}
											</tr>									   
									   ):
                                       empsArr.map((valObj,i)=>
                                                               {      
                                                                 
                                                                  let emailSentFlag=false,emailConfirmedFlag=false; 
                                                                  let emailErr=null;                                                                
                                                                      if(emailSentArr.length>0 && emailSentArr.length-1 >= emailArrCtr && parseInt(emailSentArr[emailArrCtr]["EmpId"])===parseInt(valObj["id"])  &&  emailSentArr[emailArrCtr]["Email"]===valObj["email"])
                                                                      {                                                                        
                                                                        if(emailSentArr[emailArrCtr]["emailSent"]===true) emailSentFlag=true;
                                                                        if(emailSentArr[emailArrCtr]["emailConfirmed"]===true  || empEmailConfirmed===true || (this.state.empEmailConfirmationIDArr.includes(parseInt(valObj["id"]).toString().trim()))   ) emailConfirmedFlag=true;
                                                                        emailErr=emailSentArr[emailArrCtr]["emailErr"];                                                                        
                                                                        emailArrCtr++;
                                                                      }
                                                                

                                                                 return <tr data-row={"d_"+i} key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()}>																			
                                                                   {
                                                                     Object.values(valObj).map
																	 ((val,k)=>
																	 {                                                                                                             
                                    
                                    let colHeader=ADMINCOLS[k]?ADMINCOLS[k]["col-header"]:"none"; 
                                    if (k===11)return null;
																	   return (<td col-header={(k===0 || k===1)?"":colHeader} key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()}>
                                       {k===0  && i===0?
                                          <div className="custom-control custom-checkbox  selAllSmall">                                                                                
                                          <input type="checkbox" onClick={this.handleCheckClick} className='custom-control-input ' key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()} id="selAll_Small" name="selAll_Small" checked={this.state.selAllChecked}  onChange={this.handleCheckChangeAll} />
                                          <label className="custom-control-label" htmlFor="selAll_Small">{"Select All"}</label>&nbsp;
                                          <button key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()} className='btn btnsm btn-primary ' onClick={this.sendEmail}>{"Send"}
                                          </button>
                                          </div>:""
                                          }
                                      {k===0 || k===1?  
                                      <React.Fragment> 

                                        <div className=" check">                                                                                                                          
                                            <span >{colHeader}</span> 
                                        </div>

                                        {k===0?                                                                      
                                          (<div className="custom-control custom-checkbox ">                                                                                
                                            <input type="checkbox"  className='custom-control-input ' key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()} id={"selOne_"+i+"_"+k} name={"selOne_"+i+"_"+k}  checked={this.state.selOneChecked["selOne_"+i+"_"+k]} onChange={this.handleCheckChange}  />                                                                                   
                                            <label className="custom-control-label" htmlFor={"selOne_"+i+"_"+k}>
                                                {val===true || emailSentFlag? "Sent":(emailErr?(<React.Fragment><span>{"Not Sent "}</span><i title={emailErr} className='fa fa-exclamation-triangle clsErr'></i></React.Fragment>):("Not Sent "))}
                                            </label> 
                                            </div> 
                                          ):(val===true || emailConfirmedFlag ?"Confirmed":"Not Confirmed")
                                          }                                    
                                     
                                      </React.Fragment>
                                      :val}																			
																	   </td>
                                     )
																	 })
                                                                   }
                                                                 </tr>
                                                                }
                                                               )
                                      
                                      }                                                                                                             
                                     </tbody>                 
                  </table>
                  
                       
//*********EMP admin super end ********************************* */
               ):
              (
//*********emp only start********************************* */				
				<table  className="tblflexSuper tblsuper" >
                 
                                    <thead >
                                    <tr >                             
                                    {                                     
                                        EMPSCOLS.map((colObj,i)=>   {
                                                                    return(
                                                                                
                                                                                  <th key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()} >
                                                                                    {colObj.text}
                                                                                  </th>                                                                               
                                                                             )   
                                                                }
                                                    )
                                      }
                                       </tr>
                                      </thead>
                                      <tbody >
                                        <tr>
                                          {Object.values(empsArr).map((val,i)=>
                                          {
                                            let colHeader=EMPSCOLS[i]?EMPSCOLS[i]["col-header"]:"none";
                                            return val?(i<8?<td col-header={colHeader} key={+new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random()}>{val}</td>:null):
                                            (null)})}
                                          </tr>                                      
                                      </tbody>
                                  </table>
//*********emp only end********************************* */             
             )               
             )
   }
   
</div> 
       
);
   }
}

DashboardPage.propTypes = {  
     empValidated: PropTypes.bool.isRequired,
     empsArr:PropTypes.oneOfType([PropTypes.object.isRequired,PropTypes.array.isRequired]),
     role:PropTypes.string.isRequired, 
     emailSentArr:PropTypes.oneOfType([PropTypes.object.isRequired,PropTypes.array.isRequired]),     
     empEmailErrors:PropTypes.oneOfType([PropTypes.object.isRequired,PropTypes.string.isRequired]), 
     SUPER_ADMIN:PropTypes.bool.isRequired,
 };
 
 function mapStateToProps(state) {      
   return { empValidated: state.EmpsLoginReducer.empValidated,
     empsArr:state.EmpsLoginReducer.empsArr,role:state.EmpsLoginReducer.role, 
     emailSentArr:state.EmpsLoginEmailReducer.emailSentArr,     
     empEmailErrors:state.EmpsLoginEmailReducer.empEmailErrors,       
     empEmailsLoading:state.EmpsLoginEmailReducer.empEmailsLoading,
     empEmailConfirmed:state.EmpsEmailConfirmedReducer.empEmailConfirmed,
     SUPER_ADMIN:state.EmpsLoginReducer.SUPER_ADMIN,
};
 }

 function mapDispatchToProps(dispatch) {
  return {
    empLoginSendEmailAction: bindActionCreators(empLoginSendEmailAction, dispatch),
  };
}
 
 export default connect(mapStateToProps,mapDispatchToProps)(DashboardPage);
