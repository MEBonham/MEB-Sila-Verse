import React, { setGlobal } from 'reactn';
import useForm from '../../hooks/useForm';
import firebase from '../../config/fbConfig';
import { useGlobal } from 'reactn';

const NewHeroForm = props => {

    const [ user, setUser ] = useGlobal('user');
    const isAuthenticating = useGlobal('isAuthenticating');
    if (!isAuthenticating && !user) {
        props.history.push("/login");
    }

    const [ prevHeroes, setHeroes ] = useGlobal('heroes');
    const sendInfo = () => {
        const db = firebase.db;
        if (!inputs.identity) {
            inputs.identity = "";
        }
        if (!inputs.heroType) {
            inputs.heroType = "";
        }
        if (!inputs.abilitiesNote) {
            inputs.abilitiesNote = "";
        }
        db.collection("heroes").add({
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
        })
        .then(heroRef => {
            db.collection("heroes")
                .doc(heroRef.id)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.exists) {
                        const hero = querySnapshot.data();
                        hero.id = heroRef.id;
                        console.log(hero);
                        hero.abilities = JSON.parse(hero.abilities);
                        prevHeroes.push(hero);
                        setGlobal({
                            heroes: prevHeroes
                        });
                    }
                })
                .catch(err => {
                    console.log("Error getting hero (ID ", heroRef.id, ") info to update with: ", err);
                });
        })
        .catch(err => {
            console.error("Error adding hero: ", err);
        });
        setInputs({
            ...inputs,
            urlid: "",
            name: "",
            identity: "",
            heroType: "",
            powerLevel: null,
            baseStr: "",
            effStr: "",
            baseSta: "",
            effSta: "",
            baseAgl: "",
            effAgl: "",
            baseDex: "",
            effDex: "",
            baseFgt: "",
            effFgt: "",
            baseInt: "",
            effInt: "",
            baseAwe: "",
            effAwe: "",
            basePre: "",
            effPre: "",
            abilitiesNote: ""
        })
    }

    const { inputs, handleInputChange, handleSubmit, setInputs } = useForm(sendInfo);

    return(
        <section className="hero-info-form-envelope">
            <form className="hero-info-form" onSubmit={handleSubmit}>
                <header>
                    <h1>New Hero Info</h1>
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

export default NewHeroForm;