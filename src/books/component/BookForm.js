import React, { Component } from "react";
import { createBook, editBookById } from "./api"


export default class BookForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            photo: "",
            description: "",
            link: ""
        };
    }

    componentDidMount() {
        if (this.props.editBook) {
          //props data from book

          this.setState({
            title: this.props.title,
            photo: this.props.photo,
            description: this.props.description,
            link: this.props.link
          });
        }
      }

    // Set state with new value when an input field is changed
    chnageHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submitHanler = e => {
        // Prevent page reload when the form is submitted
        e.preventDefault();

        // Get the input values from the state
        const { title, description, photo, link } = this.state;

        //create if statment to switch btween add and edit
        if (this.props.addBook) {
        // Get contributor Id from props
        const contributor = this.props.contributorId;

        // Create new Book object with the data from inputs
        const newBook = { title, description, photo, link, contributor };  
          
    createBook({ book: newBook })
    .then(res => {
        this.props.addBook(res.data.book);
    })
        .catch(err => console.log(err));
    }

    else if (this.props.editBook) {
      // Create updatedBook that take value from input
      const updatedBook = { title, description, photo, link };
      
      editBookById(this.props.id, updatedBook)
        .then(res => {
          this.props.editBook(this.props.id, updatedBook);
        })
        .catch(err => console.log(err));
    }

        // Return all the state values to their defaults
        this.setState({
            title: "",
            photo: "",
            description: "",
            link: ""
        });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.submitHanler}>
                    <div>
                        <label>Title: </label>
                        <input
                            name="title"
                            value={this.state.title}
                            onChange={this.chnageHandler}
                            placeholder="The Book Title"
                        />
                    </div>
                    <div>
                        <label>Description: </label>
                        <input
                            name="description"
                            value={this.state.description}
                            onChange={this.chnageHandler}
                            placeholder="The Description"
                        />
                    </div>
                    <div>
                        <label>Link: </label>
                        <input
                            name="link"
                            value={this.state.link}
                            onChange={this.chnageHandler}
                            placeholder="The link"
                        />
                    </div>
                    <div>
                        <label>Photo: </label>
                        <input
                            name="photo"
                            value={this.state.photo}
                            onChange={this.chnageHandler}
                            placeholder="Add Photo for book"
                        />
                    </div>

                    <button type="submit">Add Book</button>
                </form>
            </div>
        );
    }
}