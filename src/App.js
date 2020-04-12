import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import apiURL from "./apiConfig";
import Contributor from './contributors/components/Contributor';
import Student from './students/components/Student';
import Home from './Home.js';
import ContributorForm from './contributors/components/ContributorForm';
import {addNewContributor} from './contributors/api'
import StudentForm from './students/components/StudentForm';
import { createNewStudent } from './students/api';


class App extends React.Component {
    //Definition of an empty array
    constructor(props) {
      super(props);
      this.state = {
        books: []
      };
      console.log("API URL", apiURL);
    }
    ///Creat setBooks
    setBooks = books => {
      this.setState({ books: books });
    };
  //Creat Fountain  to add new Student in database
    addnewStudent = student => {
      createNewStudent(student)
        .then(res => {
          console.log(res.data.student);
        })
        .catch(error => {
          console.log(error);
        });
    };
    //Creat Fountain  to add new Contributor in database
    addnewContr = contributor => {
      addNewContributor(contributor)
        .then(res => {
          console.log(res.data.contributor);
        })
        .catch(error => {
          console.log(error);
        });
    };




  render() {
    return (

        <div className="main">
            <header>
                <h1> R-OnlineBooks <span>"Choose Book And Stay Home"</span></h1>
            </header>

        <Router>
        <nav className="link">
          <Link to="/"><img src="https://cdn4.iconfinder.com/data/icons/science-and-technology-3-10/65/103-512.png" alt="no img" height="100px"/></Link>
          <Link className="link" to="/Home">About us</Link> { '  ' }
          <Link className="link" to="/Student">Search Book</Link> { '  ' }
          <Link className="link" to="/Contributor">Contributor?</Link>
        </nav>

  
        <div>

          <Route
            path="/Home"
            render={() => (
              <Home/>
            )}
          />

          <Route
              exact
              path="/"
              render={() => <StudentForm addnewStudent={this.addnewStudent} />}
            />

            <Route
              exact
              path="/"
              render={() => <ContributorForm addnewContr={this.addnewContr} />}
            />

          <Route
            path="/Student"
            render={() => (
              <Student
              books={this.state.books} 
              setBooks={this.setBooks}
              />
            )}
          />
          
  
          <Route
            path="/Contributor"
            render={() => (
              <Contributor
              books={this.state.books} 
              setBooks={this.setBooks}
              />
            )}
          />
        </div>
        </Router>
        </div>
    );
}
}


export default App;