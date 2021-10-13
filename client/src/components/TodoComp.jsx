import React from 'react';
import {Delete} from '@material-ui/icons'
import { IconButton } from '@material-ui/core';

const TodoComp = ({ todo, onDelete }) => {
    return (

        <li className="todo-item">
            <p href="/" className="c-pointer">
                {todo?.item}
            </p>
            <IconButton onClick={() => onDelete(todo._id)}>
                <Delete color='secondary' />
            </IconButton>
        </li>
    );
}

export default TodoComp
