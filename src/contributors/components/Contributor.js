import React, { Component } from "react";
import Books from "../../books/component/books";
import ContributorForm from "./ContributorForm";
import BookForm from "../../books/component/BookForm";
import { getAllContributors, deleteContributor, contributorLogin } from "../api";
import { IoMdCloseCircleOutline, IoIosHeart } from "react-icons/io";
import '../../students/components/Student.css';


export default class Contributor extends Component {
    constructor(props) {
        super(props);

        // By default theres no Contributor logged in, so no books will render
        this.state = {
            contributors: [],
            currentContributorBooks: [],
            contributorLogged: false,
            contributorId: "",
            contributorToken: localStorage.getItem("contributorToken")
        };
    }

    componentDidMount() {
        // Get all Contributors from API and load them in the state
        getAllContributors()
            .then(response => {
                this.setState({
                    contributors: response.data.contributors
                });
            })
            .catch(err => console.log(err));
    }

    // Logout contributor
    logout = () => {
        this.setState({
            contributorLogged: false,
            contributorId: "",
            currentContributorBooks: "",
            contributorToken: ""
        });

        // Clear the JWT fron Local Storage
        localStorage.removeItem("contributorToken");

    }

    // Try to Login contributor with the submitted data
    authenticateContributor = async contributor => {
        try{
            const res = await contributorLogin(contributor);

            localStorage.setItem("contributorToken", res.data.token);

            this.setState({
                contributorLogged: true,
                contributorId: res.data.contributor.id,
                contributorToken: localStorage.getItem("contributorToken")
            });

            return true
        }
        catch(err) {
            console.log(err);
        }
    }

    // Change the state of contributors books so can be rendered
    contributorLogin = async contributor => {
        // Try Login Request for the submitted Contributor data
        const loginSucess = await this.authenticateContributor(contributor);

        // check if the Contributor is authenticated
        // update the current organization to render its books
        if (loginSucess) {
            // Get all books by the organization with the ID
            const contributorBooks = this.props.books.filter(
                book => 
                book.contributor._id === this.state.contributorId
            );
            // Since an Contributor is authenticated by name the state
            // will hold its books.
            this.setState({
                currentContributorBooks: contributorBooks,
            });
        } else {
            // If no Contributor is found by name don't render any books
            // and set logged back to false since it's not authenticated
            this.setState({
                currentContributorBooks: [],
                contributorLogged: false,
                contributorId: ""
            });
        }
    };

    // Pass the books array to parent (App) to keep it in the state
    setBooks = books => {
        this.props.setBooks(books);
    };

    // Set new contributor books array
    setContributorBooks = books => {
        this.setState({
            currentContributorBooks: books
        });
    }

    // Add new book to the contributor books state
    addBook = book => {
        this.setState({
            currentContributorBooks: [
                ...this.state.currentContributorBooks,
                book
            ]
        });
    };

    // Delet contributor
    deleteContr=()=>{
        deleteContributor(this.state.contributorId, this.state.contributorToken)
        .then(response=>{
            this.setState({
                contributorLogged: false,
                currentContributorBooks: [],
                contributorId: "",
                contributorToken: ""
            })
            // Remove JWT from Local Storage
            localStorage.removeItem("contributorToken");
        })
        .catch(error => {
            console.log(error);})
        }


    render() {

        return (
            <div>
                { this.state.contributorLogged
                    ? <button className="logout" onClick={this.logout}>Logout</button>
                    : <ContributorForm contributorLogin={this.contributorLogin} />
                }
                
                <br/>

                {/* Add delete button for contributor */}
                {this.state.contributorLogged ? ( <>
                <h2 className="hello"> Hello <IoIosHeart/></h2>
                <button onClick={this.deleteContr}>Delete Account <IoMdCloseCircleOutline/></button>

                <BookForm
                    contributorId={this.state.contributorId}
                    addBook={this.addBook}
                />
                </>
                ) : (
                    ""
                )}
                <Books
                    books={this.state.currentContributorBooks}
                    setBooks={this.setBooks}
                    contributorLogged={this.state.contributorLogged}
                    setContributorBooks={this.setContributorBooks}
                />
            </div>
        );
    }
}