import React, { setGlobal } from 'reactn';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import firebase from './config/fbConfig';
import './index.css';
import App from './App';

const db = firebase.firestore();
const heroLib = [];
db.collection("heroes").get()
    .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
            heroLib.push(doc.data());
        });
        setGlobal({
            heroes: heroLib
        });
        // console.log(heroLib);
    })
    .catch(err => {
        console.log("Error initializing heroes from db: ", err);
    });

// setGlobal({
//     heroes: [
//         {
//             name: "Tiger Strike",
//             identity: "Keloth Vorski"
//         },
//         {
//             name: "Wildran",
//             identity: "Seth Fandral"
//         }
//     ]
// });

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);