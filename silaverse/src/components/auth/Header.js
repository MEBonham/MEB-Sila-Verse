import React, { useGlobal, getGlobal } from 'reactn';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';

const Header = () => {

    const [ user, setUser ] = useGlobal('user');
    const isAuthenticating = useGlobal('isAuthenticating');
    let links;
    if (user) {
        links = <SignedInLinks />;
    } else {
        links = <SignedOutLinks />;
    }

    const note = useRef("true");
    useEffect(() => {
        console.log("Refresh Header");
        note.current = getGlobal().isAuthenticating ? "true" : "false";
        console.log(note.current);
    }, [ isAuthenticating ]);

    return(
        <header>
            <h1 className="title"><Link to="/">The Sila-Verse</Link></h1>
            <p>{note.current}</p>
            {links}
        </header>
    );
}

export default Header;