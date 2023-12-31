import React, { useState } from 'react';
import Card from '../../../../components/Card/Card';
import Select from '../../../../components/Select/Select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { nanoid } from 'nanoid';

function AddTaskContent({petsList}) {

    const [types, setType] = useState([
        { id: nanoid(5), name: 'lek', checked: false },
        { id: nanoid(5), name: 'szczepienie', checked: false },
        { id: nanoid(5), name: 'wizyta u weterynarza', checked: false },
    ]);

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [selectedOptions, setSelectedOptions] = useState({
        petChoice: '',
        taskChoice: types[0].name,
    });

    const handleSelectChange = (e, select) => {
        setSelectedOptions((prev) => {
            let newDict = { ...prev };
            newDict[select] = e.target.value;
            return newDict;
        });
    };

    const [description, setDescription] = useState("");

    const handleInputChange = (event) => {
        const text = event.target.value;
        setDescription(text);
    };

    const addTask = async () => {
        try {
            const petChoice = selectedOptions.petChoice ? selectedOptions.petChoice : petsList[0].name;
            const petId = petsList.find((pet) => pet.name === petChoice).id;
            const taskData = {date: selectedDate, description, taskType: selectedOptions.taskChoice, pet: petId}

            const response = await fetch('http://localhost:3001/tasks', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            const result = await response.json();

            window.location.reload();

            //render page again

        }
        catch (err) {
            console.error('Błąd po stronie serwera:', err);
        }
    }

    return (
        <Card classes='add_task'>
            <p><b>Wybierz zwierzaka</b></p>
            <Select
                array={petsList}
                value={selectedOptions.petChoice}
                onChange={(e) => handleSelectChange(e, 'petChoice')} />
            <p><b>Wybierz zadanie</b></p>
            <Select
                array={types}
                value={selectedOptions.taskChoice}
                onChange={(e) => handleSelectChange(e, 'taskChoice')} />
            <p><b>Wybierz datę</b></p>
            <DatePicker
                className='datepicker'
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Wybierz datę i godzinę"
            />
            <p><b>Dodaj opis</b></p>
            <input className='add_task__description' required value={description} onChange={handleInputChange}/>
            <button className='btn main small' onClick={addTask}>DODAJ</button>
        </Card>
    )
}

export default AddTaskContent