import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobal } from 'reactn';

const Sidebar = () => {

    const [ heroes, setHeroes ] = useGlobal('heroes');
    const heroList = heroes ?
        heroes.map(hero => {
            return (<p>{hero.name}</p>);
        }) :
        "";

    return(
        <section className="full-sidebar">
            <Link to="/viewhero">View Hero</Link>
            <Link to="/newhero">New Hero</Link>
            {heroList}
        </section>
    );
}

export default Sidebar;