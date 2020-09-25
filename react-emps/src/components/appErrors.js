import React, { Component } from "react";

class AppErrors extends Component {
  errsArr = [];
  //UNSAFE_componentWillUpdate to avoid warning in console
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (typeof nextProps[Object.keys(nextProps)] === "string")
      this.errsArr.push(nextProps);

    console.log(nextProps);
  }
  render() {
    const { appErrs } = this.props;
    return (
      <div className="container">
        <h5>EMPS App Errors...</h5>
        <span className="clsErrs">{JSON.stringify(appErrs)}</span>
        <br /> <br />
        <div>
          <br /> <br />
          <h5>All App Errors Log...</h5>
          <textarea
            cols="100"
            rows="5"
            id="errArea"
            value={JSON.stringify(this.errsArr)}
            onChange={(event) => {}}
          ></textarea>
          {/* onChange={(event) => {}} to avoid warning in console */}
        </div>
      </div>
    );
  }
}

export default AppErrors;
