import React, { setGlobal } from 'reactn';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import firebase from './config/fbConfig';
import './index.css';
import App from './App';

const db = firebase.firestore();
const heroLib = [];
db.collection("heroes").get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const hero = doc.data();
            hero.id = doc.id;
            hero.abilities = JSON.parse(doc.data().abilities);
            heroLib.push(hero);
        });
        setGlobal({
            heroes: heroLib,
            pptTotals: {
                abilities: 0,
                powers: 0,
                advantages: 0,
                skills: 0,
                defenses: 0
            }
        });
    })
    .catch(err => {
        console.log("Error initializing heroes from db: ", err);
    });

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);