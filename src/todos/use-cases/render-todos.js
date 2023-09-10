import { Todo } from "../models/todo.models";
import { createTodoHTML } from "./";

let element;

/**
 * 
 * @param {String} elementId 
 * @param {Todo []} todos 
 */
export const renderTodos = (elementId, todos = []) => {

    // si el !elemento no existe, solo la primer vez lo creará en la segunda ya contendrá
    if (!element)
        element = document.querySelector(elementId);

    // puede ser que no encuentre porque el elementoId no está en el DOM
    if (!element) throw new Error(`Element ${ elementId } not found`);

    //purgamos
    element.innerHTML = '';

    //tomamos los todos para recorrer en la var todo
    todos.forEach( todo => {
        element.append(createTodoHTML(todo));
    });
}