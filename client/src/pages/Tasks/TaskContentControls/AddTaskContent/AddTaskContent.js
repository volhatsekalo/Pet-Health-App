import React, { useState, useEffect } from 'react';
import Card from '../../../../components/Card/Card';
import Select from '../../../../components/Select/Select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { nanoid } from 'nanoid';

function AddTaskContent() {

    const [pets, setPets] = useState([
        { id: nanoid(5), name: 'Olly', checked: false },
        { id: nanoid(5), name: 'Charlie', checked: false },
        { id: nanoid(5), name: 'Brownie', checked: false }
    ]);

    const [types, setType] = useState([
        { id: nanoid(5), name: 'Leki', checked: false },
        { id: nanoid(5), name: 'Szczepienia', checked: false },
        { id: nanoid(5), name: 'Wizyta u weterynarza', checked: false },
    ]);

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [selectedOptions, setSelectedOptions] = useState({
        petChoice: pets[0].name,
        taskChoice: types[0].name,
    });

    const handleSelectChange = (e, select) => {
        setSelectedOptions((prev) => {
            let newDict = { ...prev };
            newDict[select] = e.target.value;
            return newDict;
        });
    };

    const addTask = async () => {
        // try {
        //     // wyciagnac dane z selectow
        //     const taskData = {date: selectedDate, taskType: types[0].name , pet: selectedpetid}

        //     const response = await fetch('http://localhost:3001/pets', {
        //         method: 'POST',
        //         // credentials: 'include',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(taskData),
        //     });

        // render page again

        // }
        // catch (err) {
        //     console.error('Błąd po stronie serwera:', err);
        // }
    }

    useEffect(() => {
        const getAddOptions = async () => {
            try {
                const response = await fetch('http://localhost:3001/pets', {
                    method: 'GET',
                    // credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const petsData = await response.json();

                const petInfo = petsData.map(pet => {
                    return { id: pet._id, name: pet.name, checked: false };
                })
                console.log(petsData + 'xddd');
                setPets(petInfo);
            }
            catch (err) {
                console.error('Błąd po stronie serwera:', err);
            }
        };
        getAddOptions();
    }, []);

    return (
        <Card classes='add_task'>
            <p><b>Wybierz zwierzaka</b></p>
            <Select
                array={pets}
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
            <input className='add_task__description' required></input>
            <button className='btn main small' onClick={addTask}>DODAJ</button>
        </Card>
    )
}

export default AddTaskContent