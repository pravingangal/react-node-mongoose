import React from "react";
import "./EmpConfirmationPage.css";
import JumboTronComp from "../../codesnippets/JumboTronComp";
import EmpsSpinner from "../../utilities/EmpsSpinner";
import CheckAPIServerConnection from "../../apiemps_serverops/FetchData";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "../../store/store";
import { bindActionCreators } from "redux";
import {empConfirmEmailAction, empConfirmedEmailErr} from "../../actions/EmpConfirmEmailAction";
import $ from "jquery";

class EmpConfirmationPage extends React.Component {

  state = { empEmailConfirmed: false,apiURL:"http://127.0.0.1:4000/"};
  
  componentDidMount() {
  let JQUERY=$.noConflict();
  let navElem=JQUERY("#emailConfirmDiv").prev("nav");
  let pEmp=JQUERY(navElem).find("p.navbar-text.showEmp");
  let pEmail=JQUERY(navElem).find("p.navbar-text.showEmailVerifyingEmp");  
  pEmp.addClass("hideP");
  pEmail.addClass("showP");
  this.setState({...this.state});

  CheckAPIServerConnection(this.state.apiURL)
  .then((res) => 
  {
        if (res.status === 200) 
        {          
          this.props.empConfirmEmailAction(this.props.match.params.token);        
        }
  
}
).catch((err)=>{
    store.dispatch(empConfirmedEmailErr({emailConfirmationError: "Internal Server Error"}));
      });
}

static getDerivedStateFromProps(nextProps, prevState){
  if(nextProps.empEmailConfirmed!==prevState.empEmailConfirmed){
    return { empEmailConfirmed: nextProps.empEmailConfirmed};
 }
 else return null;
}
componentDidUpdate(prevProps, prevState) {  
  if(prevProps.empEmailConfirmed!==this.props.empEmailConfirmed){    
    this.setState({empEmailConfirmed: true});    
  localStorage.setItem("empEmailConfirmationID","");  
  localStorage.setItem("empEmailConfirmationID",this.props.empIdOfConfirmedEmail);    
  }
}
render() {
       
  const { empEmailConfirmed,empNameOfConfirmedEmail,empEmailConfirmationErr} = this.props;
  return (<JumboTronComp displayMsg={empNameOfConfirmedEmail?("Email Confirmation .."+empNameOfConfirmedEmail):("Email Confirmation ..")} jumboID="emailConfirmDiv">                             
              <h3>{empEmailConfirmed?("Thank you " +empNameOfConfirmedEmail + " for confirming email."):
              (empEmailConfirmationErr?(<span className="clsErr">{empEmailConfirmationErr}</span>):(<React.Fragment><span>Confirming Email......</span>&nbsp;&nbsp;<EmpsSpinner spinType={"LG"}/></React.Fragment>))}              
              </h3>             
          </JumboTronComp>
       );
}
}
EmpConfirmationPage.propTypes = {
  empConfirmEmailAction: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ token: PropTypes.string.isRequired }),
  }).isRequired,
};
function mapStateToProps(state) { 
  return {
    empEmailConfirmed:state.EmpsEmailConfirmedReducer.empEmailConfirmed,  
    empIdOfConfirmedEmail:state.EmpsEmailConfirmedReducer.empIdOfConfirmedEmail, 
    empNameOfConfirmedEmail:state.EmpsEmailConfirmedReducer.empNameOfConfirmedEmail,
    empEmailConfirmationErr:state.EmpsEmailConfirmedReducer.empEmailConfirmationErr,   
  };
}
function mapDispatchToProps(dispatch) {
  return {
    empConfirmEmailAction: bindActionCreators(empConfirmEmailAction, dispatch),
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(EmpConfirmationPage);
