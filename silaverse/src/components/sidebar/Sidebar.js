import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobal } from 'reactn';
import HeroListing from './HeroListing';

const Sidebar = () => {

    const [ heroes, setHeroes ] = useGlobal('heroes');
    const heroList = heroes ?
        heroes.map(hero => {
            // const url = `/viewhero/${hero.urlid}`;
            return (<HeroListing key={hero.id} id={hero.id} urlid={hero.urlid} name={hero.name} />)
            // return (<p key={hero.id}><Link to={url}>{hero.name}</Link></p>);
        }) :
        "";

    return(
        <section className="full-sidebar">
            <Link to="/newhero">New Hero</Link>
            <div className="hero-tree">
                {heroList}
            </div>
        </section>
    );
}

export default Sidebar;