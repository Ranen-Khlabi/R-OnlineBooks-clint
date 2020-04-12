import React from "react";
import BookForm from "./BookForm";
import "./book.css";



class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          editForm: false
        };
      }

    // Call parent method to delete book by ID
  deleteBook = () => {
        this.props.deleteBook(this.props.id)
    }

    // Update and write condition to switch either false or true
  updateBook = e => {
    this.setState({
      editForm: !this.state.editForm
    });
  };

  //can edeit book by contributor
  editBook = (id, book) => {
    this.props.editBook(id, book);
  };

    
      // Method to unresgiter
  leaveBook = () => {
    this.props.leaveBook(this.props.id);
  };


    render() {
        // Delete button that appears if the contributor that made the book
        // is logged in 
        const buttons = this.props.contributor ? (
            <div>
            {/* <button className="upbutton" onClick={this.updateBook}>Edit</button> */}
            <button className="upbutton" onClick={this.deleteBook}>Delete Book</button>
            </div>
        ) : ( 
         ""
        );

  
        // button to remove the book that has resgiter before
         const leaveBookButton = this.props.leaveBook ? (
        <button onClick={this.leaveBook}>Leave</button>
        ) : (
         ""
        );

        //Definition allStudents To show all students through it
        const allStudents = this.props.students.map((student, index) => (
            <p key={index}>{student.name}</p>
        ));

        return (
            <div className="book">
              <div style={this.state.editForm ? {height : "800px"} : {}}></div>

                <h2 className="titles">{this.props.title}</h2>
                <p><img src={this.props.photo} alt={this.props.title}/></p>
                <h3>Description</h3>
                <p>{this.props.description}</p>
                <br/>
                <h3>Link</h3>
                <p><a href={this.props.link}>click here to show book</a></p>

                {allStudents}
                {buttons}
                {leaveBookButton}
                
                {this.state.editForm ? (
                <BookForm 
                title={this.props.title}
                photo={this.props.photo}
                description={this.props.description}
                link={this.props.link}
                id={this.props.id}
                editBook={this.editBook}
                />
                ) : (
                    ""
                )}
            </div>
        );
    }
}

export default Book;