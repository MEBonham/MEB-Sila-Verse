import React from 'react';
import { Link } from 'react-router-dom';

const SignedInLinks = () => {
    return(
        <ul>
            <li><Link to='/'>Logout</Link></li>
        </ul>
    );
}

export default SignedInLinks;