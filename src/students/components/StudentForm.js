import React, { Component } from 'react';
import "./Student.css";
import { IoIosPersonAdd } from "react-icons/io";



export default class StudentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          password: ""
        };
    }

    OnchangeHandler = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };

    // Get the name of the student from the form state
    OnsubmitHandler = e => {
        e.preventDefault();
        
        // The inputed name in a variable
        const student = { name: this.state.name, password: this.state.password }

        this.setState({
            name: "",
            password: ""
          })
          
          if ( this.props.StudentLog){
            this.props.StudentLog(student);}
            else if (this.props.addnewStudent){
            this.props.addnewStudent(student);}
        };


    render() {
        return (
            <div>
                <form method="post" action="" onSubmit={this.OnsubmitHandler}>
                <h4> Search Books? <br/> Enter your Account or sigUp</h4>
                <br/>
                    <label for="name"> Your Name: </label>
                    <input type="text" 
                           name="name"
                           placeholder = "Type your Name... " 
                           autocomplete="off" required
                           value = {this.state.name} 
                           onChange = {this.OnchangeHandler} />

                    <label> Your Password: </label>
                    <input type="password"  
                           name="password"
                           placeholder = "Type your Password... " 
                           autocomplete="off" required
                           value = {this.state.password} 
                           onChange = {this.OnchangeHandler} />
                    <br/>
                    <button type="submit">submit <IoIosPersonAdd/></button>
                </form>           
            </div>
        )
    }
}