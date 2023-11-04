import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';


const Task = (props) => {
    return <li className='task'>{props.task} <button onClick={() => {props.delete(props.id)}}><DeleteIcon /></button> </li>
}

export default Task;