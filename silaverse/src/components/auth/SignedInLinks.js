import React, { useRef } from 'reactn';
import { Link } from 'react-router-dom';

import firebase from '../../config/fbConfig';

const SignedInLinks = () => {

    const displayName = useRef(null);
    firebase.auth.onAuthStateChanged(user => {
        displayName.current = user ? <li className="username-display">{user.displayName}</li> : null;
    });

    const handleLogout = () => {
        firebase.auth.signOut();
    }

    return(
        <ul>
            {displayName.current}
            <li><Link to='/register'>Register New Admin</Link></li>
            <li onClick={handleLogout} className="logout">Logout</li>
        </ul>
    );
}

export default SignedInLinks;