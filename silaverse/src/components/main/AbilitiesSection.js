import React, { setGlobal, useGlobal } from 'reactn';
import { useEffect } from 'react';

const AbilitiesSection = props => {
    const [pptTotals, setPptTotals] = useGlobal('pptTotals');
    const abilities = JSON.parse(props.hero.abilities);
    const strPlus = (!isNaN(abilities.str.eff) && abilities.str.eff >= 0) ? "+" : "";
    const staPlus = (!isNaN(abilities.sta.eff) && abilities.sta.eff >= 0) ? "+" : "";
    const aglPlus = (!isNaN(abilities.agl.eff) && abilities.agl.eff >= 0) ? "+" : "";
    const dexPlus = (!isNaN(abilities.dex.eff) && abilities.dex.eff >= 0) ? "+" : "";
    const fgtPlus = (!isNaN(abilities.fgt.eff) && abilities.fgt.eff >= 0) ? "+" : "";
    const intPlus = (!isNaN(abilities.int.eff) && abilities.int.eff >= 0) ? "+" : "";
    const awePlus = (!isNaN(abilities.awe.eff) && abilities.awe.eff >= 0) ? "+" : "";
    const prePlus = (!isNaN(abilities.pre.eff) && abilities.pre.eff >= 0) ? "+" : "";

    let total = 0;
    Object.keys(abilities).forEach(ability => {
        if (isNaN(abilities[ability].base)) {
            total -= 10;
        }
        else {
            total += 2 * abilities[ability].base;
        }
    });

    useEffect(() => {
        setPptTotals({
            ...pptTotals,
            abilities: total
        });
        setGlobal({
            pptTotals: pptTotals
        });
    }, []);

    return(
        <section>
            <h2><strong>Abilities</strong> [{total} ppt]</h2>
            <p><strong>Strength</strong> {abilities.str.base} <strong>({strPlus}{abilities.str.eff})</strong> &middot; <strong>
                Stamina</strong> {abilities.sta.base} <strong>({staPlus}{abilities.sta.eff})</strong> &middot; <strong>
                Agility</strong> {abilities.agl.base} <strong>({aglPlus}{abilities.agl.eff})</strong> &middot; <strong>
                Dexterity</strong> {abilities.dex.base} <strong>({dexPlus}{abilities.dex.eff})</strong></p>
            <p><strong>Fighting</strong> {abilities.fgt.base} <strong>({fgtPlus}{abilities.fgt.eff})</strong> &middot; <strong>
                Intellect</strong> {abilities.int.base} <strong>({intPlus}{abilities.int.eff})</strong> &middot; <strong>
                Awareness</strong> {abilities.awe.base} <strong>({awePlus}{abilities.awe.eff})</strong> &middot; <strong>
                Presence</strong> {abilities.pre.base} <strong>({prePlus}{abilities.pre.eff})</strong></p>
        </section>
    );
}

export default AbilitiesSection;