import { Todo } from "../models/todo.models";

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHTML = (todo) => {
    if (!todo) throw new Error('A TODO object is required');
    const html = `<h1>${ todo.descripcion } </h1>`;

    const liElement = document.createElement('li');
    liElement.innerHTML=html;

    return liElement;
}