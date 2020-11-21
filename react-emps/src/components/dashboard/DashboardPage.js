import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./DashboardPage.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FetchData from "../../apiemps_serverops/FetchData";

class DashboardPage extends Component {

  constructor(props) {

    super();
    this.state = {
      empCols: [],
      adminCols: [],
      errs:{},     
    };
    this.url="http://localhost:3000/data/data.json"    
  }
  
  componentDidMount()
  {    
    FetchData(this.url).then((res)=>{
    this.setState({empCols:[...res.empCols],adminCols:[...res.adminCols]})
    }).catch((errs)=>{
      this.setState({errs:errs})
    });
  }

   showMsg=()=>{
    alert("...TBD...")}

   genRandomKey=()=>{
     return (0|Math.random()*9e6).toString(36);
   }

   render()
   {
    const { empValidated,empsArr,role,SUPER_ADMIN } =this.props;
    const EMPSCOLS=[...this.state.empCols];
    const ADMINCOLS=[...this.state.adminCols];

    return (          
    <div className="container marginTop"  >             
    {empValidated && SUPER_ADMIN  && role==="Super" ?
    (

//*********admin admin start********************************* */
               <table className="tblflexSuper tblsuper"  >
                 <caption >{role}</caption>
                 <thead >
                     <tr >
                         <th key={+new Date() + Math.random()}>Role</th>
                         <th key={+new Date() + Math.random()}>Name</th>
                         <th key={+new Date() + Math.random()}>Upload Xls</th>
                         <th key={+new Date() + Math.random()}>Emps in Dbase</th>
                     </tr>
                 </thead>
                 <tbody >
                     <tr >
                         <td col-header="Role" key={+new Date() + Math.random()}>Super - Admin</td>
                         <td col-header="Name" key={+new Date() + Math.random()}>Admin</td>    
                         <td col-header="Upload Xls" key={+new Date() + Math.random()}><Link key={+new Date() + Math.random()} to='/upload' className="btn btn-primary ">Upload Xls</Link></td> 
                         <td col-header="Emps in Dbase" key={+new Date() + Math.random()}>
                           <button key={+new Date() + Math.random()} onClick={this.showMsg}
                           className="btn btn-primary ">
                             Emps 0-Refresh
                           </button>
						   &nbsp;
						   <button key={+new Date() + Math.random()} onClick={this.showMsg}
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
                  <caption >{role}</caption>
                <thead >
                                    <tr  >
                                    {
                                        ADMINCOLS.map((colObj,i)=>   {
                                                                    return(
                                                                                
                                                                                  <th key={+new Date() + Math.random()}>
                                                                                    {colObj.text}
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
									   
											<tr >
													<td col-header={"Send Email"} key={+new Date() + Math.random()}><button key={+new Date() + Math.random()} className='btn btnsm btn-primary' onClick={this.showMsg}>{"Send Email"}</button></td>
													<td col-header={"Email Sent ?"} key={+new Date() + Math.random()}><button key={+new Date() + Math.random()} className='btn btnsm btn-primary' onClick={this.showMsg}>{"Email Confirmed ?"}</button></td>
											{
													Object.values(empsArr).map
																	 ((val,k)=>
																	 { 
																		let colHeader=ADMINCOLS[k+2]?ADMINCOLS[k+2]["col-header"]:"none"; 
																		return k<9? (<td col-header={colHeader} key={+new Date() + Math.random()}>
																					{val}																			
																				</td>):(null)
																	 })
													}
											</tr>									   
									   ):
                                       empsArr.map((valObj,i)=>
                                                               {                                                                  
                                                                 return <tr key={+new Date() + Math.random()}>																			
                                                                   {
                                                                     Object.values(valObj).map
																	 ((val,k)=>
																	 {                                                                                                        
                                                                       let btnText=k===0?"Send Email":"Email Confirmed ?";
                                                                       let colHeader=ADMINCOLS[k]?ADMINCOLS[k]["col-header"]:"none"; 
																	   return <td col-header={colHeader} key={+new Date() + Math.random()}>
																			{k===0 || k===1?<button key={+new Date() + Math.random()} className='btn btnsm btn-primary' onClick={this.showMsg}>{btnText}</button>:val}																			
																	   </td>
																	 })
                                                                   }
                                                                 </tr>
                                                                }
                                                               )
                                      }                                                                                                             
                                     </tbody>                 
                  </table>
//*********EMP admin super end********************************* */
               ):
              (
//*********emp only start********************************* */				
				<table  className="tblflexSuper tblsuper" >
                 <caption >{role}</caption>
                                    <thead >
                                    <tr >                             
                                    {                                     
                                        EMPSCOLS.map((colObj,i)=>   {
                                                                    return(
                                                                                
                                                                                  <th key={+new Date() + Math.random()} >
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
                                            return val?(i<8?<td col-header={colHeader} key={+new Date() + Math.random()}>{val}</td>:null):
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
     SUPER_ADMIN:PropTypes.bool.isRequired,
 };
 
 function mapStateToProps(state) {    
   return { empValidated: state.empValidated,
     empsArr:state.empsArr,role:state.role,     
     SUPER_ADMIN:state.SUPER_ADMIN
};
 }
 
 export default connect(mapStateToProps)(DashboardPage);
