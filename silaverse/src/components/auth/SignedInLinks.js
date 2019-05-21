import React, { useGlobal } from 'reactn';
import { Link } from 'react-router-dom';

import firebase from '../../config/fbConfig';

const SignedInLinks = () => {

    const [ user, setUser ] = useGlobal('user');
    const displayName = user ? <li className="username-display">{user.displayName}</li> : null;

    const handleLogout = () => {
        firebase.auth.signOut();
    }

    return(
        <ul>
            {displayName}
            <li><Link to='/register'>Register New Admin</Link></li>
            <li onClick={handleLogout} className="logout">Logout</li>
        </ul>
    );
}

export default SignedInLinks;