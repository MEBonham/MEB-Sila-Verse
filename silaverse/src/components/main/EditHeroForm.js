import React, { setGlobal, useGlobal } from 'reactn';
import { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import firebase from '../../config/fbConfig';

import deleteicon from '../../images/delete-icon.png';

const EditHeroForm = props => {

    const db = firebase.firestore();
    const [ prevHeroes, setHeroes ] = useGlobal('heroes');
    const urlid = props.match.params.id;

    const sendInfo = () => {
        if (!inputs.identity) {
            inputs.identity = "";
        }
        if (!inputs.heroType) {
            inputs.heroType = "";
        }
        if (!inputs.abilitiesNote) {
            inputs.abilitiesNote = "";
        }
        db.collection("heroes").where("urlid", "==", urlid)
            .get()
            .then(querySnapshot => {
                if (!querySnapshot.empty) {
                    const heroId = querySnapshot.docs[0].id;
                    const editedHero = {
                        urlid: inputs.urlid,
                        name: inputs.name,
                        identity: inputs.identity,
                        heroType: inputs.heroType,
                        powerLevel: inputs.powerLevel,
                        abilities: JSON.stringify({
                            str: {
                                base: inputs.baseStr,
                                eff: inputs.effStr
                            },
                            sta: {
                                base: inputs.baseSta,
                                eff: inputs.effSta
                            },
                            agl: {
                                base: inputs.baseAgl,
                                eff: inputs.effAgl
                            },
                            dex: {
                                base: inputs.baseDex,
                                eff: inputs.effDex
                            },
                            fgt: {
                                base: inputs.baseFgt,
                                eff: inputs.effFgt
                            },
                            int: {
                                base: inputs.baseInt,
                                eff: inputs.effInt
                            },
                            awe: {
                                base: inputs.baseAwe,
                                eff: inputs.effAwe
                            },
                            pre: {
                                base: inputs.basePre,
                                eff: inputs.effPre
                            },
                            note: inputs.abilitiesNote
                        })
                    };
                    db.collection("heroes").doc(heroId)
                        .set(editedHero)
                        .then(() => {
                            const minusOneHero = prevHeroes.filter(hero => hero.urlid !== urlid);
                            const formattedAbilities = JSON.parse(editedHero.abilities);
                            const formattedHero = {
                                ...editedHero,
                                abilities: formattedAbilities,
                                id: heroId
                            };
                            setGlobal({
                                heroes: [
                                    ...minusOneHero,
                                    formattedHero
                                ]
                            });
                            props.history.push(`/viewhero/${inputs.urlid}`);
                        })
                        .catch(err => {
                            console.log("Error editing hero: ", err);
                        });
                }
                else {
                    console.log("Cannot find hero matching this page.");
                }
            })
            .catch(err => {
                console.log("Error getting hero that goes with this page in order to edit: ", err);
            });
    }

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this hero?")) {
            db.collection("heroes").where("urlid", "==", urlid)
                .get()
                .then(querySnapshot => {
                    if (!querySnapshot.empty) {
                        const heroId = querySnapshot.docs[0].id;
                        db.collection("heroes").doc(heroId)
                            .delete()
                            .then(() => {
                                const minusOneHero = prevHeroes.filter(hero => hero.urlid !== urlid);
                                setGlobal({
                                    heroes: minusOneHero
                                });
                                props.history.push("/");
                            })
                            .catch(err => {
                                console.log("Error deleting hero: ", err);
                            });
                    }
                    else {
                        console.log("Cannot find hero matching this page.");
                    }
                })
                .catch(err => {
                    console.log("Error getting hero that goes with this page in order to delete: ", err);
                });
        }
    }

    const { inputs, handleInputChange, handleSubmit, setInputs } = useForm(sendInfo);
    useEffect(() => {
        db.collection("heroes").where("urlid", "==", urlid)
            .get()
            .then(querySnapshot => {
                if (!querySnapshot.empty) {
                    const heroId = querySnapshot.docs[0].id;
                    const heroPrevData = db.collection("heroes").doc(heroId);
                    heroPrevData.get()
                        .then(doc => {
                            const heroAbilities = JSON.parse(doc.data().abilities);
                            if (!heroAbilities.note) {
                                heroAbilities.note = "";
                            }
                            setInputs({
                                urlid: doc.data().urlid,
                                name: doc.data().name,
                                identity: doc.data().identity,
                                heroType: doc.data().heroType,
                                powerLevel: doc.data().powerLevel,
                                baseStr: heroAbilities.str.base,
                                effStr: heroAbilities.str.eff,
                                baseSta: heroAbilities.sta.base,
                                effSta: heroAbilities.sta.eff,
                                baseAgl: heroAbilities.agl.base,
                                effAgl: heroAbilities.agl.eff,
                                baseDex: heroAbilities.dex.base,
                                effDex: heroAbilities.dex.eff,
                                baseFgt: heroAbilities.fgt.base,
                                effFgt: heroAbilities.fgt.eff,
                                baseInt: heroAbilities.int.base,
                                effInt: heroAbilities.int.eff,
                                baseAwe: heroAbilities.awe.base,
                                effAwe: heroAbilities.awe.eff,
                                basePre: heroAbilities.pre.base,
                                effPre: heroAbilities.pre.eff,
                                abilitiesNote: heroAbilities.note
                            });
                        })
                        .catch(err => {
                            console.log("Error getting hero data: ", err);
                        });
                }
                else {
                    console.log("Error finding hero that goes with this page.");
                }
            })
            .catch(err => {
                console.log("Error finding hero that goes with this page: ", err);
            });
    },
    [ urlid ]);

    return(
        <section className="hero-info-form-envelope">
            <img src={deleteicon} alt="Delete Hero" className="push-right" onClick={handleDelete} />
            <form className="hero-info-form" onSubmit={handleSubmit}>
                <header>
                    <h1>Edit Hero Info</h1>
                    <label htmlFor="urlid">URL ID</label>
                    <input
                        type="text"
                        id="urlid"
                        onChange={handleInputChange}
                        value={inputs.urlid}
                        required
                    />
                    <label htmlFor="name">Heroic Name</label>
                    <input
                        type="text"
                        id="name"
                        onChange={handleInputChange}
                        value={inputs.name}
                        required
                    />
                    <label htmlFor="identity">Identity</label>
                    <input
                        type="text"
                        id="identity"
                        onChange={handleInputChange}
                        value={inputs.identity}
                    />
                    <label htmlFor="heroType">Hero Type</label>
                    <input
                        type="text"
                        id="heroType"
                        placeholder="Original? NPC or PC?"
                        onChange={handleInputChange}
                        value={inputs.heroType}
                    />
                    <label htmlFor="powerLevel">Power Level</label>
                    <input
                        type="number"
                        id="powerLevel"
                        placeholder={10}
                        onChange={handleInputChange}
                        value={inputs.powerLevel}
                        required
                    />
                </header>
                <section className="abilities">
                    <h2>Abilities</h2>
                    <div className="abilities-div">
                        <div className="ability-div">
                            <label>Strength</label>
                            <input
                                type="text"
                                id="baseStr"
                                placeholder="Base"
                                onChange={handleInputChange}
                                value={inputs.baseStr}
                                required
                            />
                            <input
                                type="text"
                                id="effStr"
                                placeholder="Effective"
                                onChange={handleInputChange}
                                value={inputs.effStr}
                                required
                            />
                        </div>
                        <div className="ability-div">
                            <label>Agility</label>
                            <input
                                type="text"
                                id="baseAgl"
                                placeholder="Base"
                                onChange={handleInputChange}
                                value={inputs.baseAgl}
                                required
                            />
                            <input
                                type="text"
                                id="effAgl"
                                placeholder="Effective"
                                onChange={handleInputChange}
                                value={inputs.effAgl}
                                required
                            />
                        </div>
                        <div className="ability-div">
                            <label>Fighting</label>
                            <input
                                type="text"
                                id="baseFgt"
                                placeholder="Base"
                                onChange={handleInputChange}
                                value={inputs.baseFgt}
                                required
                            />
                            <input
                                type="text"
                                id="effFgt"
                                placeholder="Effective"
                                onChange={handleInputChange}
                                value={inputs.effFgt}
                                required
                            />
                        </div>
                        <div className="ability-div">
                            <label>Awareness</label>
                            <input
                                type="text"
                                id="baseAwe"
                                placeholder="Base"
                                onChange={handleInputChange}
                                value={inputs.baseAwe}
                                required
                            />
                            <input
                                type="text"
                                id="effAwe"
                                placeholder="Effective"
                                onChange={handleInputChange}
                                value={inputs.effAwe}
                                required
                            />
                        </div>
                        <div className="ability-div">
                            <label>Stamina</label>
                            <input
                                type="text"
                                id="baseSta"
                                placeholder="Base"
                                onChange={handleInputChange}
                                value={inputs.baseSta}
                                required
                            />
                            <input
                                type="text"
                                id="effSta"
                                placeholder="Effective"
                                onChange={handleInputChange}
                                value={inputs.effSta}
                                required
                            />
                        </div>
                        <div className="ability-div">
                            <label>Dexterity</label>
                            <input
                                type="text"
                                id="baseDex"
                                placeholder="Base"
                                onChange={handleInputChange}
                                value={inputs.baseDex}
                                required
                            />
                            <input
                                type="text"
                                id="effDex"
                                placeholder="Effective"
                                onChange={handleInputChange}
                                value={inputs.effDex}
                                required
                            />
                        </div>
                        <div className="ability-div">
                            <label>Intellect</label>
                            <input
                                type="text"
                                id="baseInt"
                                placeholder="Base"
                                onChange={handleInputChange}
                                value={inputs.baseInt}
                                required
                            />
                            <input
                                type="text"
                                id="effInt"
                                placeholder="Effective"
                                onChange={handleInputChange}
                                value={inputs.effInt}
                                required
                            />
                        </div>
                        <div className="ability-div">
                            <label>Presence</label>
                            <input
                                type="text"
                                id="basePre"
                                placeholder="Base"
                                onChange={handleInputChange}
                                value={inputs.basePre}
                                required
                            />
                            <input
                                type="text"
                                id="effPre"
                                placeholder="Effective"
                                onChange={handleInputChange}
                                value={inputs.effPre}
                                required
                            />
                        </div>
                        <input
                            type="text"
                            id="abilitiesNote"
                            placeholder="e.g. Load limit 50 lb."
                            onChange={handleInputChange}
                            value={inputs.abilitiesNote}
                        />
                    </div>
                </section>
                <button type="submit">Save Hero</button>
            </form>
        </section>
    );
}

export default EditHeroForm;