import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return(
        <section className="full-sidebar">
            <Link to="/viewhero">View Hero</Link>
        </section>
    );
}

export default Sidebar;