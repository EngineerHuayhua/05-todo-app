import { Todo } from "../models/todo.models";
import { createTodoHTML } from "./";


/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementId, todos = []) => {
    // console.log(elementId, todos);
    //TODO: referencia
    const element = document.querySelector(elementId);
    todos.forEach( todo => {
        element.append(createTodoHTML(todo));
    });
}