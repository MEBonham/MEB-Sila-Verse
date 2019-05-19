import React from 'react';
import { Link } from 'react-router-dom';

const SignedOutLinks = () => {
    return(
        <ul>
            <li><Link to='/login'>Admin Login</Link></li>
        </ul>
    );
}

export default SignedOutLinks;