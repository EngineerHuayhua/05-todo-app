import { Todo } from "../todos/models/todo.models";

const Filter = {
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
    filter: Filter.All,
}

const initStore = () => {
    console.log(state);
    console.log('InitStore 🥑');
}

// para cargar las nuevas ideas que se vengan
const loadStore = () => {
    throw new Error('Not implemented');
}

const getTodos = (filter=Filter.All) => {
    
    switch(filter){
        case Filter.All:
            //poner sin corchetes significa solo por referencia
            return [...state.todos];
        case Filter.Completed:
            return state.todos.filter( todo => todo.done);
        case Filter.Pending:
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
}

/**
 * 
 * @param {String} todoId Todo identified
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map( todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
}

const deleteTodo = (todoId) => {
    // uno de los valores individuales que contiene state.todos se pasa a todo una variable temporal para luego comparar, se omite todoId en el filtrado
    state.todos = state.todos.filter( todo => todo.id !== todoId );
}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => todo.done );
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filter.All) => {
    state.filter = newFilter;
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
