import React from 'react';
import useForm from '../../hooks/useForm';
import firebase from '../../config/fbConfig';

const NewHeroForm = () => {

    const sendInfo = () => {
        // alert(`Data Received!
        //       URL-ID: ${inputs.urlid}
        //       Name: ${inputs.name}
        //       Identity: ${inputs.identity}`);
        const db = firebase.firestore();
        const heroRef = db.collection("heroes").add({
            urlid: inputs.urlid,
            name: inputs.name,
            identity: inputs.identity
        })
        .then(heroRef => {
            console.log("Document written to db with ID ", heroRef.id);
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