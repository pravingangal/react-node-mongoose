import React, {Component} from "react";
import "./DashboardPage.css";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { empLoginSendEmailAction } from "../../actions/EmpLoginAction";
import empData from "../../data/data";
import DataTable from "../datatable/DataTable";
import  {GetUniqueKey}  from "../../utilities/GetUniqueId";

class DashboardPage extends Component {
  constructor(props) {
    super();    
    this.empsData=empData();  
  } 
   
   render()
   {
   
    const { empValidated,empsArr,role,SUPER_ADMIN } =this.props;    
    const EMPSCOLS=[...this.empsData.empCols];
    const ADMINCOLS=[...this.empsData.adminCols];
    const SUPERADMINCOLS=[...this.empsData.superAdminCols];
    const SUPERADMINDATAARR=[...this.empsData.superAdminDataArr];
    const SUPERADMINCONFIGARR=[...this.empsData.superAdminConfigArr];
    
    return (  
      (EMPSCOLS.length>0 && ADMINCOLS.length>0 && SUPERADMINCOLS.length>0  
      && SUPERADMINDATAARR.length>0 && SUPERADMINCONFIGARR.length>0) &&
<div className="container  marginTop">  
       
    {empValidated && SUPER_ADMIN  && role==="Super" ?
    (
//*********admin admin start********************************* *//
                
                      <DataTable 
                        key={GetUniqueKey()}  
                        colsHeaderData={SUPERADMINCOLS} 
                        colsBodyData={SUPERADMINDATAARR} 
                        noOfCols={4} 
                        showCheckBoxes={false}
                        superAdminConfigArr={SUPERADMINCONFIGARR} />  
                
//*********admin admin end********************************* */
   ):
      (
//*********emp super or admin start********************************* */
                 empValidated && !SUPER_ADMIN  && (role==="Super" || role==="Admin") ?
               (			   		
                                    <DataTable 
                                      key={GetUniqueKey()}  
                                      colsHeaderData={ADMINCOLS} 
                                      colsBodyData={empsArr} 
                                      noOfCols={11} 
                                      showCheckBoxes={true} 
                                      superAdminConfigArr={null} />                                          
//*********EMP admin super end ********************************* */
               ):
              (
//*********emp only start********************************* */							
        <DataTable 
          key={GetUniqueKey()}  
          colsHeaderData={EMPSCOLS} 
          colsBodyData={empsArr} 
          noOfCols={8} 
          showCheckBoxes={false} 
          superAdminConfigArr={null} />         
//*********emp only end********************************* */             
             )               
      )
             
   }
   
</div> 
    
);//return end
   }//render end
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
   return { 
                empValidated: state.EmpsLoginReducer.empValidated,
                empsArr:state.EmpsLoginReducer.empsArr,
                role:state.EmpsLoginReducer.role,                               
                SUPER_ADMIN:state.EmpsLoginReducer.SUPER_ADMIN,              
          };
 }

 function mapDispatchToProps(dispatch) {
  return {
    empLoginSendEmailAction: bindActionCreators(empLoginSendEmailAction, dispatch),
  };
}
 
 export default connect(mapStateToProps,mapDispatchToProps)(DashboardPage);
