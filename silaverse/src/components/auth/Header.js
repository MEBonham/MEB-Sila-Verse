import React from 'reactn';
// import { useRef } from 'react';
import { Link } from 'react-router-dom';

import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import firebase from '../../config/fbConfig';

const Header = () => {

    let links = <p className="logout">Loading ...</p>;
    firebase.auth.onAuthStateChanged(user => {
        if (user) {
            console.log("There is a user,", user);
            links = <SignedInLinks />;
        } else {
            console.log("There is not a user,", user);
            links = <SignedOutLinks />;
        }
        console.log(links);
    });

    return(
        <header>
            <h1 className="title"><Link to="/">The Sila-Verse</Link></h1>
            {links}
        </header>
    );
}

export default Header;