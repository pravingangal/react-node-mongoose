import React, { Component } from "react";
import "./LoginPage.css";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { empLoginAction } from "../../actions/EmpLoginAction";
import EmpToolTip from "../../utilities/ToolTip";
import EmpsSpinner from "../../utilities/EmpsSpinner";
import {checkAPIServerConnection} from "../../apiemps_serverops/FetchData";
import store from "../../store/store";
import {empLoggedErr} from "../../actions/EmpLoginAction";


class LoginPage extends Component {
 
  constructor(props)
  {
    super();
    this.state = {
      formData: { employeeId:localStorage.employeeId?localStorage.employeeId:"", passWord: localStorage.passWord?localStorage.passWord:"" },         
      formErrors:{ employeeId: "", passWord: "" }, 
      submitFlag:false,
      empLoginErrors:[],      
      loading:false,
      isChecked:localStorage.isChecked?localStorage.isChecked:false,
    };
    this.apiURL="http://127.0.0.1:4000/";
  
  }

  UNSAFE_componentDidMount()
  {
      this.setState({
        ...this.state,
        formData: {        
          employeeId:localStorage.employeeId?localStorage.employeeId:"",
          passWord:localStorage.passWord?localStorage.passWord:"",
        },        
        
      isChecked:localStorage.isChecked?localStorage.isChecked:false,
      });

  }
  UNSAFE_componentWillReceiveProps(nextProps){

  if(nextProps.empValidated) 
  {
	   this.setState({
      ...this.state,
      formData: {        
        employeeId:localStorage.employeeId?localStorage.employeeId:"",
        passWord:localStorage.passWord?localStorage.passWord:"",
      },
      empLoginErrors:[...nextProps.empLoginErrors],
      loading:nextProps.loading,
	  isChecked:localStorage.isChecked?localStorage.isChecked:false,
    });

	  nextProps.history.push("/dashboard");
  }

  if(!nextProps.empValidated)
  {
    
    this.setState({
      ...this.state,
      formData: {        
        employeeId:localStorage.employeeId?localStorage.employeeId:"",
        passWord:localStorage.passWord?localStorage.passWord:"",
      },
      empLoginErrors:[...nextProps.empLoginErrors],
      loading:nextProps.loading,
	  isChecked:localStorage.isChecked?localStorage.isChecked:false,
    });	
  }
  

  }




  handleValidation = (event) => {
    const validationErrors={};

    if(this.state.isChecked )
    {
		localStorage.isChecked=this.state.isChecked;		
		localStorage.employeeId=this.state.formData.employeeId;		
		localStorage.passWord=this.state.formData.passWord;
    }
    else 
    {
      localStorage.removeItem("isChecked");
	  localStorage.removeItem("employeeId");
	  localStorage.removeItem("passWord");
    }
   switch(event.type)
   {
      case "blur":
      case "focus":  
      case "keyup":                   
      case "submit":
					if(localStorage.isChecked )
					{
						this.setState({...this.state, formData: { employeeId:localStorage.employeeId,passWord:localStorage.passWord},isChecked:true});	
					}
					
                      if (!this.state.formData.employeeId ) validationErrors.employeeId = "Emp ID Can't be blank"
                      else validationErrors.employeeId="";
                      if (!this.state.formData.passWord) validationErrors.passWord = "Password Can't be blank";
                      else validationErrors.passWord="";
					
            break;                      
      default:
     
   }
   

    this.setState({...this.state, formErrors:{...validationErrors},empLoginErrors:[] });
      if(validationErrors.employeeId==="" && validationErrors.passWord==="")
        return true
      else 
        return false;
    
  };

  handleSubmit = (event) => {   
    
    event.preventDefault();

    const {formData}=this.state;

   
   if(this.handleValidation(event))	
    {
      this.setState({...this.state, loading:true,submitFlag:true});
      checkAPIServerConnection(this.apiURL)
          .then((res) => {
                            if (res.status === 200) 
                            {
                              
                              console.log("API Server is up and running......",res);
                              
                              this.props.empLoginAction(formData); 
                              this.setState({...this.state, submitFlag:true, empLoginErrors:[],});
                            }
                            else
                            {
                                                          
                              store.dispatch(empLoggedErr({empsError: "Internal Server Error"}));
                              this.setState({...this.state,submitFlag:false,  });	
								              console.log("server error......");
                             
                            }    
                          }   
          ).catch((err)=>{ store.dispatch(empLoggedErr({...err})); });                 
                
    }
    
  };


  handleChange=(event) => {

    this.setState({
      ...this.state,
      formData: {
        ...this.state.formData,
        [event.target.name]: event.target.value.trim(),
      },
    });

  }

  handleCheckBox = (event) => {    
    this.setState({
      ...this.state,      
      isChecked: event.target.checked,      
    });
  };

  render() {
    const { formData, isChecked } = this.state;

    const {loading, empValidated}=this.props;
    return (
      <div className="container-fluid h-65 w95 ">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3 loginWrap marginTop0 marginTop1 marginTop2">
    <h3>Login...</h3>
            <form className="form-horizontal" onSubmit={this.handleSubmit} noValidate>
           
              <div className="form-group input-id">                                                          
                <input
                  type="text"
                  className="form-control form-control-lg "
                  id="employeeId"
                  name="employeeId" 
                  maxLength="18"                 
                  required
                  form="novalidatedform"
                  value={formData.employeeId  }
                  onChange={this.handleChange} 
                  onKeyUp  ={this.handleValidation}                         
                  onBlur={this.handleValidation}  
                  onFocus={this.handleValidation}                    
                /> 
                 <label className="control-label" htmlFor="employeeId">
                  Emp ID:                  
                </label>                 
                  <EmpToolTip empErrMsg={this.state.formErrors.employeeId} />                 
              </div>
              <div className="form-group input-pwd">                
                <input
                  type="passWord"
                  name="passWord"
                  maxLength="18"  
                  className="form-control form-control-lg "
                  id="passWord"                  
                  value={formData.passWord  }
                  onChange={this.handleChange}            
                  onKeyUp  ={this.handleValidation}                         
                  onBlur={this.handleValidation}  
                  onFocus={this.handleValidation}                  
                  required
                  form="novalidatedform"
                />   
                <label className="control-label" htmlFor="passWord">
                  passWord                  
                </label>                     
                  <EmpToolTip empErrMsg={this.state.formErrors.passWord} />                 
                  
              </div>
              <div className="form-group marginTopNegative">
             
                <div className="checkbox">
                  <label>
                    <input type="checkbox" checked={!!isChecked}  name="remMe" onChange={this.handleCheckBox} />
                    &nbsp;Remember me
                  </label>
                </div>
              </div>
              <div className="form-group marginTopNegative">
                <input
                  type="submit"
                  className="btn btn-info btn-lg btn-block "
                  value="Sign In"
                  disabled={(loading || this.state.loading) && this.state.submitFlag}
                />
                
              </div>
              <div className="form-group centerText">
              <span className="alert-danger">
                {!loading && !empValidated  && this.state.empLoginErrors.length>0?<EmpToolTip empErrMsg={this.state.empLoginErrors} classList={"fa fa-cut"} />:null}                  
                </span>                
                <span>{((loading || this.state.loading) && this.state.submitFlag )?<EmpsSpinner spinType={"MD"} />:null}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  empLoginAction: PropTypes.func.isRequired,
  loading:PropTypes.bool.isRequired,
  empValidated: PropTypes.bool.isRequired,
  empLoginErrors:PropTypes.array.isRequired
};

function mapStateToProps(state) { 
  return {
    loading: state.EmpsLoginReducer.loading,
    empValidated: state.EmpsLoginReducer.empValidated,
    empLoginErrors: Object.values(state.EmpsLoginReducer.empLoginErrors),   
  };
}

function mapDispatchToProps(dispatch) {
  return {
    empLoginAction: bindActionCreators(empLoginAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
