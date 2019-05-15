import React from 'react';
import { Link } from 'react-router-dom';
import SignedOutLinks from './SignedOutLinks';

const Header = () => {
    return(
        <header>
            <h1 className="title"><Link to="/">The Sila-Verse</Link></h1>
            <SignedOutLinks />
        </header>
    );
}

export default Header;