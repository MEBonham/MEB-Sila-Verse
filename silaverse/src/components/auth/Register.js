import React from 'react';
import useForm from '../../hooks/useForm';

const Register = () => {

    const registry = () => {
        alert(`Data Received!
              Email: ${inputs.email}
              Password: ${inputs.password}`);
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
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                onChange={handleInputChange}
                value={inputs.password}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;