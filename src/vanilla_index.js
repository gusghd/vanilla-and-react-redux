import {createStore} from 'redux';

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

const addTodo = (todo) => {
    return {
        type: ADD_TODO,
        todo
    }
}

const deleteTodo = (id) => {
    return {
        type: DELETE_TODO,
        id
    }
}

const reducer = (state = [], action) => {
    switch(action.type) {
        case ADD_TODO:
            return [{todo: action.todo, id: Date.now()}, ...state];
        case DELETE_TODO:
            return state.filter(todo => todo.id !== action.id);
        default:
            return state
    }
}

const store = createStore(reducer);


const dispatchAddTodo = (todo) => {
    store.dispatch(addTodo(todo));
}

const dispatchDeleteTodo = (e) => {
    const id = parseInt(e.target.parentNode.id, 10);
    store.dispatch(deleteTodo(id));
}

const paintTodo = () => {
    const todos = store.getState();
    ul.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Del';
        deleteBtn.addEventListener('click', dispatchDeleteTodo);
        li.id = todo.id;
        li.innerText = todo.todo;
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    })
}

store.subscribe(paintTodo);

const onSubmit = (e) => {
    e.preventDefault();
    const todo = input.value;
    input.value = '';
    dispatchAddTodo(todo);
}

form.addEventListener('submit', onSubmit)