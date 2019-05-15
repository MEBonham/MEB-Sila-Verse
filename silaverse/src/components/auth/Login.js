import React from 'react';
import useLoginForm from '../../hooks/useLoginForm';

const Login = () => {

    const signIn = () => {
        alert(`Data Received!
              Email: ${inputs.email}
              Password: ${inputs.password}`);
    }

    const { inputs, handleInputChange, handleSubmit } = useLoginForm(signIn);

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
        </form>
    );
}

export default Login;