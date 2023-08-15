// import { html } from './app.html?raw';

import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases';

//lo creamos como una variable ya que puede ser muy volatil si fuera texto
const ElementIDs = {
    TodoList: '.todo-list',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    // funcion que esta encargado de desplegar los todos
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        // console.log(todos);
        renderTodos(ElementIDs.TodoList, todos);
    }

    //f()autoinvocada cuando la función App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();
}