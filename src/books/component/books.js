//import React from react
import React from "react";
import Book from "./book";
import { getAllBooks, deleteBookById, editBookById } from "./api";

//Creat class Books
class Books extends React.Component {
  //Creat componentDidMount Inside getAllBooks Show allBooks
  componentDidMount() {
    getAllBooks()
      .then(response => {
        this.props.setBooks(response.data.book);
      })
      .catch(error => {
        console.log("API ERROR:", error);
      });
  }
  //edit method by id
  editBook = (id, book) => {
    //find the id in books array and compare it
    const indexOfBookToUpdate = this.props.books.findIndex(
      book => book._id === id
    );
    // assign indexOfBookToUpdate to oldBook
    const oldBook = this.props.books[indexOfBookToUpdate];
    const { title, description, photo, link } = book;
    //make a copy to newAarry
    const newArray = [...this.props.books];
    // use splice to set the change
    newArray.splice(indexOfBookToUpdate, 1, {
      ...oldBook,
      title,
      link,
      photo,
      description
    });
    //props the method and take parmeter newArray to use
    this.props.setContributorBooks(newArray);
  };


  // Delete book by ID
  deleteBook = id => {
    deleteBookById(id)
      .then(res => {
        // Filter books to execlude the book with the passed id
        const newBooks = this.props.books.filter(book => book._id !== id);
        // Set the value of the new organization's books array
        this.props.setContributorBooks(newBooks);
      })
      .catch(err => console.log(err));
  };


  // Get the book by it's id from the books list passed in props
  getBookById = bookId => {
    return this.props.books.find(book => book._id === bookId);
  };


  // Method to unregister a User to book by ID
  leaveBook = bookId => {
    // Get the current book that the user is registering for
    const book = this.getBookById(bookId);

    // remove the new registered user from the book's list of users
    const updatedStudentsList = book.students.filter(
      studentId => studentId === this.props.studentId
    );

    // Make an API request to update list ofbooks's users
    editBookById(bookId, { students: updatedStudentsList })
      .then(res => {
        // Pass the updated book ID to parent to set its state
        this.props.leaveBook(bookId);
      })
      .catch(err => console.log(err));
  };

  
  render() {
    let allbooks = <h4></h4>;
    if (this.props.books.length > 0) {
      // pass on every books
      allbooks = this.props.books.map((book, index) => {
        return (
          <Book
            title={book.title}
            photo={book.photo}
            description={book.description}
            link={book.link}
            contributor={book.contributor}
            students={book.students}
            id={book._id}
            key={index}
            ContributorLogged={this.props.ContributorLogged}
            deleteBook={this.deleteBook}
            editBook={this.editBook}
            leaveBook={this.props.leaveBook ? this.leaveBook : null}
          />
        );
      });
    }
    return (
      <>
        {allbooks}
      </>
    );
  }
}
export default Books;
