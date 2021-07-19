import React from 'react';
import './Login.css';
import from_bg from "../../images/form_bg.jpg";
import googleIcon from '../../images/google.png';
import fbIcon from '../../images/fb.png';
import gitIcon from '../../images/github.png';
import { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const Login = () => {
    const [signedInUser, setSignedInUser] = useContext(UserContext);
    const history =useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const url = window.location.href;
    if (url.includes('login')) {
        document.body.style.backgroundImage = `url(${from_bg})`;
    }

    const showRegisterForm = () => {
        document.getElementById("registerForm").style.display = "block";
        document.getElementById("loginForm").style.display = "none";
    }

    const showLoginForm = () => {
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
    }

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
        isValid: false
    })

    let isFieldValid = true;
    const handleBlur = (e) => {
        const newUserInfo = { ...user };

        let emailError = document.getElementById("emailHelp");
        if (e.target.name === "email" && /(.+)@(.+){2,}\.(.+){2,}/.test(e.target.value) === false) {
            emailError.style.display = "block";
            isFieldValid = false;
        } else {
            emailError.style.display = "none";
            isFieldValid = true;
        }

        let passwordError = document.getElementById("passHelp");
        if (e.target.name === "password" && (e.target.value.length > 8) === false) {
            passwordError.style.display = "block";
            isFieldValid = false;
        } else {
            passwordError.style.display = "none";
            isFieldValid = true;
        }

        let cpassError = document.getElementById("cpassHelp");
        if (e.target.name === "cpassword" && newUserInfo.password !== e.target.value) {
            cpassError.style.display = "block";
            isFieldValid = false;
        } else {
            cpassError.style.display = "none";
            isFieldValid = true;
        }

        newUserInfo[e.target.name] = e.target.value;
        newUserInfo['isValid'] = isFieldValid;
        setUser(newUserInfo);
    }

    const createNewUser = (e) => {
        if (user.isValid === true) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((result) => {
                    const createdUser = { ...user };
                    setUser(createdUser);
                    return result.user.updateProfile({
                        displayName: user.name
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {

        }
        e.preventDefault();
        document.getElementById("registerForm").reset();
    }

    const getValue = (e) => {
        const userInfo = { ...user };

        if (e.target.name === "email" && /(.+)@(.+){2,}\.(.+){2,}/.test(e.target.value) === false) {
            isFieldValid = false;
        } else {
            isFieldValid = true;
        }

        if (e.target.name === "password" && (e.target.value.length > 8) === false) {
            isFieldValid = false;
        } else {
            isFieldValid = true;
        }
        userInfo[e.target.name] = e.target.value;
        userInfo['isValid'] = isFieldValid;
        setUser(userInfo);
    }

    const loginUser = (e) => {
        if (user.isValid === true) {
            let loginError = document.getElementById("loginError");
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((result) => {
                    loginError.innerText = '';
                    const createdUser = { ...user };
                    createdUser['name'] = result.user.displayName;
                    setUser(createdUser);
                    setSignedInUser(createdUser);
                    history.replace(from);
                })
                .catch((error) => {
                    loginError.innerText = error.message;
                });
        }
        e.preventDefault();
        document.getElementById("loginForm").reset();
    }

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then((result) => {
                const createdUser = {
                    name: result.user.displayName,
                    email: result.user.email
                };
                setSignedInUser(createdUser);
                history.replace(from);
            }).catch((error) => {
                console.log(error);
            })
    }

    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const handleFacebookSignIn = () => {
        firebase.auth().signInWithPopup(facebookProvider)
            .then((result) => {
                const createdUser = {
                    name: result.user.displayName,
                    email: result.user.email
                };
                setSignedInUser(createdUser);
                history.replace(from);
            }).catch((error) => {
                console.log(error);
            })
    }

    const githubProvider = new firebase.auth.GithubAuthProvider();
    const handleGithubSignIn = () => {
        firebase.auth().signInWithPopup(githubProvider)
            .then((result) => {
                const createdUser = {
                    name: result.user.displayName,
                    email: result.user.email
                };
                setSignedInUser(createdUser);
                history.replace(from);
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="container">
            <div className="form-container">
                <form id="registerForm" onSubmit={createNewUser}>
                    <h4>Create an account</h4>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" autoComplete="off" onBlur={handleBlur} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="new-email">Email address</label>
                        <input type="email" className="form-control" name="email" id="new-email" aria-describedby="emailHelp" placeholder="Enter your email" autoComplete="off" onBlur={handleBlur} />
                        <small id="emailHelp" className="form-text">Please enter a valid email address.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="new-password">Password</label>
                        <input type="password" className="form-control" name="password" id="new-password" aria-describedby="passHelp" placeholder="Enter your password" onBlur={handleBlur} />
                        <small id="passHelp" className="form-text">Password must be 8 characters long.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpassword">Confirm Password</label>
                        <input type="password" className="form-control" name="cpassword" id="cpassword" aria-describedby="cpassHelp" placeholder="Confirm Password" onBlur={handleBlur} />
                        <small id="cpassHelp" className="form-text">Password doesn't match.</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Create an account</button>
                    <p>Already have an account?
                        <span onClick={showLoginForm} style={{ color: "#00c3ff", cursor: "pointer" }}> Login</span>
                    </p>
                </form>
                <form id="loginForm" onSubmit={loginUser}>
                    <h4>Login</h4>
                    <p id="loginError"></p>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" className="form-control" id="email" placeholder="Enter your email" autoComplete="off" aria-describedby="emailHelp" onBlur={getValue} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-control" id="password" placeholder="Enter your password" onBlur={getValue} />

                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="remember" />
                        <label className="form-check-label" htmlFor="remember">Remember me</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <p>Don't have an account?
                        <span onClick={showRegisterForm} style={{ color: "#00c3ff", cursor: "pointer" }}> Create an account</span>
                    </p>
                </form>
            </div>
            <h4 style={{ margin: "20px auto" }}>Or Continue With</h4>
            <div className="auth-media">
                <img onClick={handleGoogleSignIn} src={googleIcon} alt="google" />
                <img onClick={handleFacebookSignIn} src={fbIcon} alt="facebook" />
                <img onClick={handleGithubSignIn} src={gitIcon} alt="github" />
            </div>
        </div>
    );
};

export default Login;