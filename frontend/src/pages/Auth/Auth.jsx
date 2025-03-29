import {LoginPage} from "../../Auth/components/LoginPage.jsx";
import React from "react";
import './Auth.css';
import RegisterPage from "../../Auth/components/RegisterPage.jsx";

function Login() {


    return (
        <div className="app">


            <div className="login-container">
                <LoginPage/>

            </div>


        </div>

    )
}

export default Login;

