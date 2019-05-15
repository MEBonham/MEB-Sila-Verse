import React from 'react';
import { useGlobal } from 'reactn';

const CharSheet = () => {

    const [ heroes, setHeroes ] = useGlobal('heroes');
    if (heroes) {
        return(
            <section className="char-sheet">
                <h1>{heroes[0].name}</h1>
                <h2>{heroes[0].identity}</h2>
            </section>
        );
    }
    else {
        return(<section></section>);
    }
}

export default CharSheet;