import apiUrl from "../apiConfig";
import axios from "axios";

// get all students
const getAllStudents = () => {
    return axios.get(`${apiUrl}/students`);
};

// Create students
const createNewStudent =(student)=>{
    return axios.post(`${apiUrl}/students`,{student})
}


const deleteStudentById =(id, token)=>{
    return axios.delete(
        `${apiUrl}/students/${id}`,
        {
            headers:
            {
                "Content-type": "application/json",
                "x-auth-userToken": token
            }
        }
   )
}

// Login Student
const loginStudent = student => {
    return axios.post(
        `${apiUrl}/students/login`, 
        {student},
        )
};


// Logout Student
const logoutStudent = () => {
    return axios.get(
        `${apiUrl}/students/logout`, 
        {
            withCredentials: true,
            credentials: "include"
        }
        )
};

export { getAllStudents, 
         createNewStudent, 
         deleteStudentById, 
         loginStudent,
         logoutStudent
        };