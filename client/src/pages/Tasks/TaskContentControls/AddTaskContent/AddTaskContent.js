import React, { useState } from 'react';
import Card from '../../../../components/Card/Card';
import Select from '../../../../components/Select/Select';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import pl from 'date-fns/locale/pl';
import 'react-datepicker/dist/react-datepicker.css';
import { nanoid } from 'nanoid';
registerLocale('pl', pl)
setDefaultLocale('pl');

function AddTaskContent({petsList}) {

    const [status, setStatus] = useState('');
    const [messageState, setMessageState] = useState('green');

    const today = new Date();

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
            if (!selectedDate) {
                setMessageState("red");
                setStatus("Wybierz datę");
            }
            else {
                const taskData = { date: selectedDate, description, taskType: selectedOptions.taskChoice, pet: petId }

                await fetch('http://localhost:3001/tasks', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(taskData),
                });

                window.location.reload();
            }
        }
        catch (err) {
            setMessageState("red");
            setStatus("Dodaj najpierw zwierzę");
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
                locale="pl"
                minDate={today}
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy HH:mm"
                placeholderText="Wybierz datę i godzinę"
            />
            <p><b>Dodaj opis</b></p>
            <input className='add_task__description' required value={description} onChange={handleInputChange}/>
            <div className={messageState}>{status}</div>
            <button className='btn main small' onClick={addTask}>DODAJ</button>
        </Card>
    )
}

export default AddTaskContent