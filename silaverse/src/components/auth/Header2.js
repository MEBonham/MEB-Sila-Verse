import React from 'reactn';
// import { useState } from 'react';
import { Link } from 'react-router-dom';

import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
// import firebase from '../../config/fbConfig';

const Header2 = () => {

    return(
        <header>
            <SignedInLinks />
            <SignedOutLinks />
        </header>
    );
}

export default Header2;