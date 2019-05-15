import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobal } from 'reactn';

const Sidebar = () => {

    const [ heroes, setHeroes ] = useGlobal('heroes');
    const heroList = heroes ?
        heroes.map(hero => {
            const url = `/viewhero/${hero.urlid}`;
            return (<p key={hero.id}><Link to={url}>{hero.name}</Link></p>);
        }) :
        "";

    return(
        <section className="full-sidebar">
            <Link to="/viewhero">View Hero</Link>
            <Link to="/newhero">New Hero</Link>
            <div className="hero-tree">
                {heroList}
            </div>
        </section>
    );
}

export default Sidebar;