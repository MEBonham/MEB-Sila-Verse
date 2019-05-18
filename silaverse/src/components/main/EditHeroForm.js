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
                            console.log(doc.data());
                            setInputs({
                                urlid: doc.data().urlid,
                                name: doc.data().name,
                                identity: doc.data().identity
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
    [ inputs.urlid, urlid ]);

    return(
        <section className="hero-info-form-envelope">
            <img src={deleteicon} alt="Delete Hero" className="push-right" onClick={handleDelete} />
            <form className="hero-info-form" onSubmit={handleSubmit}>
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
                <button type="submit">Save Hero</button>
            </form>
        </section>
    );
}

export default EditHeroForm;