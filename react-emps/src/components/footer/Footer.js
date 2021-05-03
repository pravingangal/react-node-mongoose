import React from "react";
import "./Footer.css";

const Footer = ({ empName }) => {
  return (
    <footer>
      <div className="container-fluid ">
        <div className="footerDiv">
          {" "}        
          <span>Home</span> &nbsp; &nbsp;<span>©2020 </span>&nbsp;&nbsp;
              <span>Corp &amp; Co.</span>
        </div>
        <div className="footerBorder marginBottom10">&nbsp;</div>             
      </div>
      <div className="disFlex">Lorem Epsum Lorem Epsum Lorem Epsum</div>
    </footer>
  );
};

export default Footer;
