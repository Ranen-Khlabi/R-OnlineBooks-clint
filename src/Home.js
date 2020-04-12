import React, { Component } from "react";
import "./App.css";
import { IoMdMail, IoLogoSlack, IoLogoGithub } from "react-icons/io";


export default class Home extends Component {
    render() {
      return (
        <div className="home">
          <h4>Welcome!</h4>
          <h5>It is a website that helps <strong>students</strong> or anyone who wants to search
              <br/>for a reference or book that helps them through this site,<br/>
              and also anyone who wants to <strong>contribute</strong> to publishing a reference or book.</h5>
              <br/>
              <h4>Connect with us!</h4>
              <a href="https://ranen-alkhlabi@hotmail.com"><IoMdMail/></a> 
              <a href="https://slack.com/UUYCYF10R"><IoLogoSlack/></a> 
              <a href="https://github.com/Ranen-Khlabi"><IoLogoGithub/></a> 
        </div>
      );
    }
  }