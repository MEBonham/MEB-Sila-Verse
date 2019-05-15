import React, { setGlobal } from 'reactn';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

setGlobal({
    counter: 0,
    heroes: [
        {
            name: "Tiger Strike",
            identity: "Keloth Vorski"
        },
        {
            name: "Wildran",
            identity: "Seth Fandral"
        }
    ]
});

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);