import axios from '../api/axios.js';

const USER_URL = `/users`;

const getAllUsers = (jwtToken) => {
    const request = axios.get(`${USER_URL}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data);
}

const getUser = (id, jwtToken) => {
    const request = axios.get(`${USER_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data);
}

const createUser = (newUser) => {
    const request = axios.post(`${USER_URL}`, newUser);
    return request.then(response => response.data);
}

const removeUser = (id, jwtToken) => {
    const request = axios.delete(`${USER_URL}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data);
}

const updateUser = (id, updatedUser, jwtToken) => {
    const request = axios.put(`${USER_URL}/${id}`, updatedUser,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
        }
    });
    return request.then(response => response.data);
}

const authUser = (email, password) => {
    const item = {
        email,
        password,
        withCredentials: true,
    };
    const request = axios.post(`${USER_URL}/auth`, item);
    return request.then(response => response.data);
}

const refreshJwtToken = () => {
    const item = {
        withCredentials: true,
    }
    const request = axios.post(`${USER_URL}/auth/refresh`, item)
    return request.then(response => response.data);
}

export { getAllUsers, getUser, createUser, removeUser, updateUser, authUser, refreshJwtToken };