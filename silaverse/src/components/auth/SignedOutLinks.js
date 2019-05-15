import React from 'react';
import { Link } from 'react-router-dom';

const SignedOutLinks = () => {
    return(
        <ul>
            <li><Link to='/'>Login</Link></li>
            <li><Link to='/'>Register</Link></li>
        </ul>
    );
}

export default SignedOutLinks;