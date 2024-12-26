import axios from "axios";
import { config } from "./Config.js";

const API_URL = `${config.API}/users`;

const getAllUsers = () => {
    const request = axios.get(API_URL);
    return request.then(response => response.data);
}

const getUser = (id) => {
    const request = axios.get(`${API_URL}/${id}`);
    return request.then(response => response.data);
}

const createUser = (newUser) => {
    const request = axios.post(API_URL, newUser);
    return request.then(response => response.data);
}

const removeUser = (id) => {
    const request = axios.delete(`${API_URL}/${id}`);
    return request.then(response => response.data);
}

const updateUser = (id, updatedUser) => {
    const request = axios.put(`${API_URL}/${id}`, updatedUser);
    return request.then(response => response.data);
}

const authUser = (email, password) => {
    const request = axios.post(`${API_URL}/auth`, {
        email: email, 
        password: password
    });
    return request.then(response => response.data);
}

export { getAllUsers, getUser, createUser, removeUser, updateUser, authUser };