import { Todo } from "../todos/models/todo.models";

// exportamos para poder utilizarlo en la funcion app
export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del realidad'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore 🥑');
}

// Cargamos el contenido de localStorage
const loadStore = () => {
    // si no hay nada almacenado en localStorage retorna o no trae nada
    if( !localStorage.getItem('state') ) return;
    // pero si tiene contenido, se ejcuta mostrando el contenido
    const {todos = [], filter = Filter.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

// almacenamos state en localStorage
const saveStateToLocalStorage = () => {
    //indicamos que vamos a almacener en localStorage, los valores contenidos en JSON.stringify() se convertiran en string que es lo que se puede almacenar en localStorage
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodos = (filter=Filter.All) => {
    
    switch(filter){
        case Filters.All:
            //poner sin corchetes significa solo por referencia
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done);
        case Filters.Pending:
            //retorna false al hacer la negación
            return  state.todos.filter((todo)=>!todo.done );
        default:
            throw new Error(`Option ${filter} is not valid`)
    }
}

/**
 * 
 * @param {String} descripcion 
 */
const addTodo = (descripcion) => {
    if (!descripcion) throw new Error('Description is required');
    // se toma state.todos que es un array y se le agrega una nueva instancia de objeto
    state.todos.push( new Todo(descripcion));
    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId Todo identified
 */
const toggleTodo = (todoId) => {
    //map barre todo el contenido de todo en un nuevo array
    state.todos = state.todos.map( todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
    saveStateToLocalStorage();
}

const deleteTodo = (todoId) => {
    // uno de los valores individuales que contiene state.todos se pasa a todo una variable temporal para luego comparar, se omite todoId en el filtrado
    state.todos = state.todos.filter( todo => todo.id !== todoId );
    saveStateToLocalStorage();
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done );
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

//no se debe exponer state ya podrian modificar el contenido del objeto
const getCurrentFilter = () => {
    return state.filter;
}



export default {
    getTodos,
    addTodo,
    initStore,
    loadStore,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter
}
