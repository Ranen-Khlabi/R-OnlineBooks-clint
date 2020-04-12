import apiUrl from "../apiConfig";
import axios from "axios";

// Get all Contributors
const getAllContributors = () => {
    return axios.get(`${apiUrl}/contributors`);
};

// Create New Contributors
const addNewContributor =(contributor)=>{
    return axios.post(`${apiUrl}/contributors`, {contributor})
}


const deleteContributor = (id, token) => {
    return axios.delete(
            `${apiUrl}/contributors/${id}`, 
            { 
                headers: 
                { 
                    "Content-type": "application/json", 
                    "x-auth-contributorToken": token 
                } 
            }
        );
}



// Login Contributor
const contributorLogin = contributor => {
    return axios.post(`${apiUrl}/contributors/login`, {contributor})
}

// Logout Contributor
const contributorLogout = () => {
    return axios.get(
        `${apiUrl}/contributors/logout`,
        {
            withCredentials: true,
            credentials: "include"
        }
    )
}


export { getAllContributors,
         addNewContributor, 
         deleteContributor, 
         contributorLogin,
         contributorLogout 
        };