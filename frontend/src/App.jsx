import React from 'react';
import AppRouter from './AppRouter';
import axios from 'axios';

// Configure axios with interceptors for token handling
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token expiration
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // If the server responds with a 401 Unauthorized, clear the token
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('access');

            // Redirect to login page
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

function App() {
    return (
        <>

            <AppRouter/>

        </>
    );
}

export default App;