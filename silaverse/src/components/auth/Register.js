import React, { useGlobal } from 'reactn';
import { useState } from 'react';
import useForm from '../../hooks/useForm';
import firebase from '../../config/fbConfig';

const Register = props => {

    const [ user, setUser ] = useGlobal('user');
    if (!user) {
        props.history.push("/login");
    }

    const [errorMessage, setErrorMessage] = useState("");

    const registry = () => {
        // alert(`Data Received!
        //       Email: ${inputs.email}
        //       Password: ${inputs.password}`);
        firebase.auth.createUserWithEmailAndPassword(inputs.email, inputs.password)
        .then(() => {
            firebase.auth.currentUser.updateProfile({
                displayName: inputs.username
            });
            props.history.push("/login");
        })
        .catch(err => {
            if ( err.code && err.code.trim() == "auth/email-already-in-use") {
                setErrorMessage("Email already in use.");
            } else {
                setErrorMessage("Miscellaneous error registering.");
                console.log("Miscellaneous error registering.", err);
            }
        });
    }

    const { inputs, handleInputChange, handleSubmit, setInputs } = useForm(registry);

    return(
        <form className="login-page" onSubmit={handleSubmit}>
            <h1>Register</h1>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                onChange={handleInputChange}
                value={inputs.email}
                required
            />
            <label htmlFor="username">Username</label>
            <input
                type="username"
                id="username"
                onChange={handleInputChange}
                value={inputs.username}
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
            <button type="submit">Register</button>
            <p className="error-message">{errorMessage}</p>
        </form>
    );
}

export default Register;