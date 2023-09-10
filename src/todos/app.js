// import { html } from './app.html?raw';

import todoStore, {Filters} from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos, renderPendign } from './use-cases';

//lo creamos como una variable ya que puede ser muy volatil si fuera texto
const ElementIDs = {
    ClearCompletedButton: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    // funcion que esta encargado de desplegar los todos
    const displayTodos = () => {
        // para los todos
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        // console.log(todos);
        //ahora vamos a renderizar en html, creamo casos de uso use-cases enviamos id del elemento donde se va renderizar y la lista de todos
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPendign(ElementIDs.PendingCountLabel);
    }

    //f()autoinvocada cuando la función App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();


    //Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const TodoListUL = document.querySelector(ElementIDs.TodoList);
    const clearCompletedBotton = document.querySelector(ElementIDs.ClearCompletedButton);
    const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);

    //listeners para presiona y suelta la tecla
    newDescriptionInput.addEventListener('keyup', (event) => {
        //solo en el caso de que sea diferente a enter pasa al siguiente if
        if (event.keyCode !== 13) return;
        // si hay un valor pasa y si no retorna
        if (event.target.value.trim().length === 0) return;

        // llamamos a la capa de negocio y la funcion addTodo para agregar el contenido de input
        todoStore.addTodo(event.target.value );

        //un vez cargado, tenemos que renderizar y listar todos, pero como ya tenemos esa funcion, solo lo llamamos
        displayTodos();
        // para que borre el contenido del input
        event.target.value='';
    });

    TodoListUL.addEventListener('click', (event) => {
        //el metodo closest indica extraer el padre mas cercano que tenga el data-id
        const element = event.target.closest('[data-id]');
        //en la capa de negocio llamamos a la funcion toggleTodo para cambiar el estado pasamos el id del elemento
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    TodoListUL.addEventListener('click', (event) => {

        // indicamos si el evento paso por destroy y valor booleano lo almancenamos en isDestroyElement
        const isDestroyElement = event.target.className === 'destroy';
        // obtenemos el id del elemento
        const element = event.target.closest('[data-id]');
        // validamos si el element isDestroyElement existen
        if ( !element || !isDestroyElement) return;
        
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    clearCompletedBotton.addEventListener('click', (event) => {

        const isClearCompletedButton = event.target.className === 'clear-completed';
        
        if (!isClearCompletedButton) return;

        todoStore.deleteCompleted();
        displayTodos();
    });

    // filtersUL no es un elemento es una lista y por eso no podemos agregar directamente addlistener
    filtersLIs.forEach( element =>{
        element.addEventListener('click', (element) => {
            // borramos todas las clases con selected
            filtersLIs.forEach( el => {
                el.classList.remove('selected');
            })
            // el element seleccionado será el que está en esta funcion luego si no lo encuentra lo busca el de mas arriba
            element.target.classList.add('selected');

            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                break;                
            }

            displayTodos();
        });
    });

}