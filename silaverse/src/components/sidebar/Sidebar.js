import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobal } from 'reactn';

const Sidebar = () => {

    const [ heroes, setHeroes ] = useGlobal('heroes');

    return(
        <section className="full-sidebar">
            <Link to="/viewhero">View Hero</Link>
            { heroes && heroes.map(hero => {
                return (<p>{hero.name}</p>);
            })}
        </section>
    );
}

export default Sidebar;