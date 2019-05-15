import React, { setGlobal } from 'reactn';
import useForm from '../../hooks/useForm';
import firebase from '../../config/fbConfig';
import { useGlobal } from 'reactn';

const NewHeroForm = () => {

    const [ prevHeroes, setHeroes ] = useGlobal('heroes');
    const sendInfo = () => {
        // alert(`Data Received!
        //       URL-ID: ${inputs.urlid}
        //       Name: ${inputs.name}
        //       Identity: ${inputs.identity}`);
        const db = firebase.firestore();
        if (!inputs.identity) {
            // setInputs({
            //     ...inputs,
            //     identity: ""
            // });
            inputs.identity = "";
        }
        db.collection("heroes").add({
            urlid: inputs.urlid,
            name: inputs.name,
            identity: inputs.identity
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
            identity: ""
        })
    }

    const { inputs, handleInputChange, handleSubmit, setInputs } = useForm(sendInfo);

    return(
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
            <button type="submit">Save Hero</button>
        </form>
    );
}

export default NewHeroForm;