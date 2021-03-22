import React, { useState } from 'react';
import {connect} from 'react-redux';
import { actionCreator } from '../store';
import ToDo from '../components/ToDo';

function Home({todos, addTodo}) {
    const [text, setText] = useState('');
    const onTextChange = (e) => {
        const value = e.target.value;
        setText(value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setText('');
        addTodo(text);
    }
    
    return (
        <>
            <h1>To Do's</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onTextChange}/>
                <button>Add</button>
            </form>
            <ul>
                {todos.map((todo) => (
                     <ToDo {...todo} key={todo.id}/>
                ))}
                
            </ul>
        </>
    )
}

function mapStateToProps(state) {
    return {todos: state};
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addTodo: (text) => dispatch(actionCreator.addTodo(text)),
        deleteTodo: (id) => dispatch(actionCreator.deleteTodo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);
