import React, { Component } from "react";
import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";
import {checkAPIServerConnection} from "../apiemps_serverops/FetchData";
import "./UploadXlsToDBase.css";

class UploadXlsToDBase extends Component { 
constructor(props) {
  super();
  this.state = {
    empFileUpPercent: 0,
    apiData: false,
    apiURL: "http://127.0.0.1:4000",
    appErrs: {},
  };
  this.socket = null;  
}

checkAPIServerConnection = () => {
  return fetch(this.state.apiURL);
};

uploadXLS = () => {
  checkAPIServerConnection(this.state.apiURL)
    .then((res) => {
      if (res.status === 200) {
        console.log("API Server is up and running......");
        if (!this.socket) this.socket = socketIOClient(this.state.apiURL); 
        this.socket.on("FromEMPAPI", (msg) => {
          this.setState({ apiData: msg });
        });
        this.socket.on("FromEMPAPI_Err", (errMsg) => {
          this.setState({ appErrs: errMsg });
        });
        this.socket.on("FromEMPAPI_Percent", (data) => {
          this.setState({ empFileUpPercent: data });
        });
        this.socket.emit(
          "message",
          "From client...Msg-0...Initiate xls file upload to mongodb"
        );
        this.socket.on("disconnect", (disconnectMsg) => {
          console.log("Server disconnected....", disconnectMsg);
          this.closeSocket();
        });
      } else {
        this.setState({
          appErrs:
            "Something went wrong. Internal server error..Pl try after some time.",
        });
        this.closeSocket();
      }
    })
    .catch((err) => {
      console.log(
        "Something went wrong. Internal server error..Pl try after some time."
      );
      this.setState({
        appErrs:
          "Something went wrong. Internal server error..Pl try after some time.",
      });
      this.closeSocket();
    });
};
closeSocket = () => {
  if (this.socket) this.socket.close();
  this.socket = null;
};
reset = () => {
  
  this.setState({ empFileUpPercent: 0, apiData: false,appErrs: {},});
  
};

render() {
  return (

    <div className="container centerFlex ">
      <div className="jumbotron  w80">
      <h4 >Upload Data...Admin</h4>
      <p className="lead">Lorem Epsum Lorem Epsum Lorem Epsum </p>
      <span><Link  to='/dashboard' className="btn btn-primary ">Dashboard</Link></span>&nbsp;&nbsp;&nbsp;
      <button className="btn btn-primary btn-lg btn-sm" onClick={this.uploadXLS}>
        Upload XLS
      </button>&nbsp;&nbsp;&nbsp;
      <button className="btn btn-primary btn-lg btn-sm" onClick={this.closeSocket}>
        Stop Upload
      </button>&nbsp;&nbsp;&nbsp;
      <button className="btn btn-primary btn-lg btn-sm" onClick={this.reset}>
        Reset...
      </button>
      <br />      
      <span>
        Upload %....<span className="clsStatus">{this.state.empFileUpPercent}</span>
      </span>     
      <span>
        File Upload ( apiData ) ....
        <span className="clsStatus">{this.state.apiData}</span>
      </span>
      <h6>EMPS App Errors...</h6>
      <span className="clsErrs">{JSON.stringify(this.state.appErrs)}</span>    
          <textarea
            cols="100"
            rows="3"
            id="errArea"
            value={JSON.stringify(this.state.appErrs)}
            onChange={(event) => {}}
          ></textarea>          
    </div>
  </div> 
  );
}
 
};

export default UploadXlsToDBase;
