// import { html } from './app.html?raw';

import html from './app.html?raw';

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    //f()autoinvocada cuando la función App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
    })();
}