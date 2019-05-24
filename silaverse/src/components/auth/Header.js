import React, { useGlobal } from 'reactn';
import { Link } from 'react-router-dom';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';

const Header = () => {

    const [ user, setUser ] = useGlobal('user');
    let links;
    if (user) {
        links = <SignedInLinks />;
    } else {
        links = <SignedOutLinks />;
    }

    return(
        <header>
            <h1 className="title"><Link to="/">*The Sila-Verse*</Link></h1>
            {links}
        </header>
    );
}

export default Header;