import apiUrl from '../../apiConfig';
import axios from 'axios';


// Get All Books
const getAllBooks = () => {
  return axios.get(`${apiUrl}/books`);
};

export { getAllBooks}