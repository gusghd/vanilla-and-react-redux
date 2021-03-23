import React from 'react';
import {connect} from 'react-redux';
import { remove } from '../store';
import {Link} from 'react-router-dom';

function ToDo({text, onButtonClick, id}) {
    return (
        <li>
            <Link to={`/${id}`}>{text}</Link>
            <button onClick={onButtonClick}>Del</button>
        </li>
            
    )
}

function mapDispatchToProps(dispatch, ownProps) {
    console.log(ownProps);
    return {
        onButtonClick: () => dispatch(remove(parseInt(ownProps.id, 10)))
    }
}

export default connect(null, mapDispatchToProps) (ToDo);
