import React, { useGlobal } from 'reactn';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../../config/fbConfig';

const SignedInLinks = () => {

    const user = useGlobal('user');
    const [ displayName, setDisplayName ] = useState(null);
    // firebase.auth.onAuthStateChanged(user => {
    //     if (user) {
    //         setDisplayName(<li className="username-display">{user.displayName}</li>);
    //     } else {
    //         setDisplayName(null);
    //     }
    // });
    useEffect(() => {
        setDisplayName(<li className="username-display">{user.displayName}</li>);
    }, [ user ]);

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