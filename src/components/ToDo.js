import React from 'react';
import {connect} from 'react-redux';
import { actionCreator } from '../store';
import {Link} from 'react-router-dom';

function ToDo({text, onButtonClick, id}) {
    return (
        <li>
            <Link to={`/${id}`}>
            {text}<button onClick={onButtonClick}>Del</button>
            </Link></li>
    )
}

function mapDispatchToProps(dispatch, ownProps) {
    console.log(ownProps);
    return {
        onButtonClick: () => dispatch(actionCreator.deleteTodo(parseInt(ownProps.id, 10)))
    }
}

export default connect(null, mapDispatchToProps) (ToDo);
