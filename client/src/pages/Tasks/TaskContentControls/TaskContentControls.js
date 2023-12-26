import React from 'react';
import './TaskContentControls.css';
import AddTaskContent from './AddTaskContent/AddTaskContent';
import TaskContentFilters from './TaskContentFilters/TaskContentFilters';

function TaskContentControls() {
    return (
        <div className='filters__container'>
            <p><b>Dodaj zadanie</b></p>
            <AddTaskContent/>
            <p><b>Filtry</b></p>
            <TaskContentFilters/>
        </div>
    )
}

export default TaskContentControls