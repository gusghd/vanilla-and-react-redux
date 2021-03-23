import {createStore} from 'redux';

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

const addTodo = (text) => {
    return {
        type: ADD_TODO,
        text
    }
}

const deleteTodo = (id) => {
    return {
        type: DELETE_TODO,
        id
    }
}

const saveInLocalStorage = (list) => {
    localStorage.setItem('redux-todo-list', JSON.stringify(list));
}

const reducer = (state = JSON.parse(localStorage.getItem('redux-todo-list')) ?? [] , action) => {
    switch(action.type) {
        case ADD_TODO:
            const addedToDoList = [{text: action.text, id: Date.now()}, ...state];
            saveInLocalStorage(addedToDoList);
            return addedToDoList;
        case DELETE_TODO:
            const deletedToDoList = state.filter(todo => todo.id !== action.id);
            saveInLocalStorage(deletedToDoList);
            return deletedToDoList;
        default:
            return state
    }
}

const store = createStore(reducer);

export const actionCreator = {
    addTodo,
    deleteTodo
}
export default store;