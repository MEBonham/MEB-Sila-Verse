import React, { useGlobal } from 'reactn';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import firebase from '../../config/fbConfig';

const Header = () => {

    const user = useGlobal('user');
    const [ links, changeLinks ] = useState(<p className="logout">Loading ...</p>);
    // firebase.auth.onAuthStateChanged(user => {
    //     if (user) {
    //         // changeLinks(<SignedInLinks />);
    //     } else {
    //         // changeLinks(<SignedOutLinks />);
    //     }
    // });
    useEffect(() => {
        if (user) {
            changeLinks(<SignedInLinks />);
        } else {
            changeLinks(<SignedOutLinks />);
        }
    }, [ user ]);
    

    return(
        <header>
            <h1 className="title"><Link to="/">The Sila-Verse</Link></h1>
            {links}
        </header>
    );
}

export default Header;