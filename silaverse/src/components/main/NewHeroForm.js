import React, { setGlobal } from 'reactn';
import useForm from '../../hooks/useForm';
import firebase from '../../config/fbConfig';
import { useGlobal } from 'reactn';

const NewHeroForm = () => {

    const [ prevHeroes, setHeroes ] = useGlobal('heroes');
    const sendInfo = () => {
        const db = firebase.firestore();
        if (!inputs.identity) {
            inputs.identity = "";
        }
        if (!inputs.heroType) {
            inputs.heroType = "";
        }
        db.collection("heroes").add({
            urlid: inputs.urlid,
            name: inputs.name,
            identity: inputs.identity,
            heroType: inputs.heroType,
            powerLevel: inputs.powerLevel
        })
        .then(heroRef => {
            db.collection("heroes")
                .doc(heroRef.id)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.exists) {
                        const hero = querySnapshot.data();
                        hero.id = heroRef.id;
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
            powerLevel: null
        })
    }

    const { inputs, handleInputChange, handleSubmit, setInputs } = useForm(sendInfo);

    return(
        <section className="hero-info-form-envelope">
            <form className="hero-info-form" onSubmit={handleSubmit}>
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
                <button type="submit">Save Hero</button>
            </form>
        </section>
    );
}

export default NewHeroForm;