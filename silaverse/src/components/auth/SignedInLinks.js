import React from 'react';
import { Link } from 'react-router-dom';

import firebase from '../../config/fbConfig';

const SignedInLinks = () => {

    const handleLogout = () => {
        firebase.auth.signOut();
    }

    return(
        <ul>
            <li><Link to='/register'>Register New Admin</Link></li>
            <li onClick={handleLogout} className="logout">Logout</li>
        </ul>
    );
}

export default SignedInLinks;