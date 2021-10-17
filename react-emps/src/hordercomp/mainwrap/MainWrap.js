import React, { Component} from "react";
import classes from "./MainWrap.module.css";
import TopNav from "../../components/nav/TopNav";

class MainWrap extends Component{
 
    constructor(props)
    {
        super();
        this.state = { navItemsData: [] };        
    }
    componentDidMount()
    {        
          fetch("http://localhost:3000/data/navData.json").then(res => res.json()).then(data =>
                        {                                                                                      
              this.setState({ navItemsData: [...data.navItemsConfig] });            
                        }).catch((err) => {
                                           
                        });                
    }
    render()
    {       
        return(
                <React.Fragment>                           
                <TopNav navItemsData={this.state.navItemsData} />
                                <main className={"container-fluid " + classes.mainCls}>
                                    {this.props.children}
                                 </main>
                </React.Fragment>           
    );
    }
}

export default MainWrap;
