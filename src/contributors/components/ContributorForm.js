import React, { Component } from "react";
import { IoIosPersonAdd } from "react-icons/io";

export default class ContributorForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            password: ""
        };
    }

    // Set state with the new value of the input field
    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    // Get the name of the contributor from the form state
    submitHandler = e => {
        e.preventDefault();
        // The inputed name in a variable
        const contributor = {name: this.state.name, password: this.state.password};

        // Return the state to the original so the input field value is cleared
        this.setState({
            name: "",
            password: ""
        });

        // Call the method of the contributor login in the parent
        // and pass it the name of the contributor to be logged in
        if ( this.props.contributorLogin){
            this.props.contributorLogin(contributor);}
            else if (this.props.addnewContr){
            this.props.addnewContr(contributor);}
          };

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                <h4> Contributor?<br/>Enter your Account or sigUp</h4>
                <br/>
                    <label>Your Name: </label>
                    <input
                        value={this.state.name}
                        onChange={this.changeHandler}
                        type="text" 
                        name="name"
                        placeholder = "Type your Name... " 
                        autocomplete="off" required>
                    </input>

                    <label>Your Password: </label>
                    <input
                        value={this.state.password}
                        onChange={this.changeHandler}
                        type="password" 
                        name="password"
                        placeholder = "Type your Password... " 
                        autocomplete="off" required>
                    </input>
                    <button type="submit"> submit <IoIosPersonAdd/></button>
                </form>
            </div>
        );
    }
}