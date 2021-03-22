import React from 'react';
import { connect } from 'react-redux';
import {actionCreator} from '../store';

function Detail({todo, onButtonClick, history}) {
    const onDeleteBtnClick = () => {
        onButtonClick();
        history.push('/');
    }
    return (
    <>
        <h1>{todo.text}</h1>
        <h3>created at: {todo.id}</h3>
        <button onClick={onDeleteBtnClick}>Delete</button>
    </>)
}

function mapStateToProps(state, ownProps) {
    const {match:{params:{id}}} = ownProps;
    console.log(state, id);
    return {todo: state.find(todo => todo.id === parseInt(id, 10))}
}

function mapDispatchToProps(dispatch, ownProps) {
    const {match:{params:{id}}} = ownProps;
    return {
        onButtonClick: () => dispatch(actionCreator.deleteTodo(parseInt(id, 10)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);