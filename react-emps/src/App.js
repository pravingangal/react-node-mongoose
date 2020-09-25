import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import DashboardPage from "./components/DashboardPage";
import AppErrors from "./components/appErrors";
import "./App.css";

class App extends Component {
  constructor(props) {
    //super(props);//deprecated
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

  toggleShowHide = () => {
    this.setState({ buttonState: !this.state.buttonState });
  };

  uploadXLS = () => {
    this.checkAPIServerConnection()
      .then((res) => {
        if (res.status === 200) {
          console.log("API Server is up and running......");
          if (!this.socket) this.socket = socketIOClient(this.state.apiURL); //due to this socket.on("connect") raised in index.js of node server(api-emps)
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
  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>EMPS React App</h1>
        </div>
        <div className="jumbotron">
          <DashboardPage
            uploadXLS={this.uploadXLS}
            closeSocket={this.closeSocket}
            empFileUpPercent={this.state.empFileUpPercent}
            apiData={this.state.apiData}
          />
          <br />
          <AppErrors appErrs={this.state.appErrs} />
        </div>
      </div>
    );
  }
}

export default App;
