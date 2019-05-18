import React, { useGlobal } from 'reactn';

import AbilitiesSection from './AbilitiesSection';

const CharSheet = props => {

    const [ heroes, setHeroes ] = useGlobal('heroes');
    const { id } = props.match.params;
    const filteredHeroes = heroes ?
        heroes.filter(hero => hero.urlid === id)
        : [];
    if (filteredHeroes.length) {
        const thisHero = filteredHeroes[0];
        return(
            <section className="char-sheet">
                <header>
                    <h1>{thisHero.name}</h1>
                    <h2>{thisHero.identity}</h2>
                    <p className="hero-type">{thisHero.heroType}</p>
                    <p className="last-header-line">Power Level {thisHero.powerLevel} ( ppt)</p>
                </header>
                <AbilitiesSection hero={thisHero} />
            </section>
        );
    }
    else {
        return(<section></section>);
    }
}

export default CharSheet;