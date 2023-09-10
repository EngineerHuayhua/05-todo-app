import { Todo } from "../models/todo.models";

/**
 *
 * @param {Todo} todo
 */
export const createTodoHTML = (todo) => {
  if (!todo) throw new Error("A TODO object is required");

  // desestructuramos todo para una mejor comprension
  const { done, descripcion, id } = todo;

  // lo ponemos ${ done ? 'checked':''} para determinar si se realizó
  const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${ done ? 'checked':''}>
            <label>${ descripcion }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `;

  const liElement = document.createElement("li");
  liElement.innerHTML = html;
  //agregamos un atributo data-id 
  liElement.setAttribute('data-id', id);

  //se agrega la clase 'completed', si lo está o sea el tachado, al elemento liElement
  if (todo.done) {
    liElement.classList.add('completed');
  }

  return liElement;
};
