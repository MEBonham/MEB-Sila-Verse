import React, { useGlobal } from 'reactn';
import { useState } from 'react';
import useForm from '../../hooks/useForm';
import firebase from '../../config/fbConfig';

const Login = props => {

    const [ user, setUser ] = useGlobal('user');
    if (user) {
        props.history.push("/");
    }

    const [errorMessage, setErrorMessage] = useState("");

    const signIn = () => {
        firebase.auth.signInWithEmailAndPassword(inputs.email, inputs.password)
            .catch(err => {
                if ( err.code && err.code.trim() == "auth/wrong-password") {
                    setErrorMessage("Invalid username or password.");
                } else {
                    setErrorMessage("Miscellaneous error signing in.");
                    console.log("Miscellaneous error signing in.", err);
                }
            });
    }

    const { inputs, handleInputChange, handleSubmit, setInputs } = useForm(signIn);

    return(
        <form className="login-page" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                onChange={handleInputChange}
                value={inputs.email}
                required
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                onChange={handleInputChange}
                value={inputs.password}
                required
            />
            <button type="submit">Login</button>
            <p className="error-message">{errorMessage}</p>
        </form>
    );
}

export default Login;