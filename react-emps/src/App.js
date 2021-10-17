import React, { Component } from "react";
import AllRoutes from "./routes/AllRoutes/AllRoutes";
import MainWrapper from "./hordercomp/mainwrap/MainWrap";
import Footer from "./components/footer/Footer";
import "./App.css";



class App extends Component {
  constructor(props) {    
    super();
  }
   
  render() {
    return (
      <MainWrapper  >        
        <AllRoutes />
        <Footer />
      </MainWrapper>
    );
  }
}

export default App;
