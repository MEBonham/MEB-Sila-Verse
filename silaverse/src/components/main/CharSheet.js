import React from 'react';
import { useGlobal } from 'reactn';

const CharSheet = props => {

    const [ heroes, setHeroes ] = useGlobal('heroes');
    const { id } = props.match.params;
    const filteredHeroes = heroes ?
        heroes.filter(hero => hero.urlid === id)
        : [];
    if (filteredHeroes.length) {
        return(
            <section className="char-sheet">
                <h1>{filteredHeroes[0].name}</h1>
                <h2>{filteredHeroes[0].identity}</h2>
            </section>
        );
    }
    else {
        return(<section></section>);
    }
}

export default CharSheet;