import React, { useState } from 'react';
import './TaskContentControls.css';
import Card from '../../../components/Card/Card';
import Select from '../../../components/Select/Select';
import { nanoid } from 'nanoid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CheckBoxList from '../../../components/CheckBoxList/CheckBoxList';

function TaskContentControls() {
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

    const [dates, setDate] = useState([
        { id: nanoid(5), name: 'Dziś', checked: false },
        { id: nanoid(5), name: 'Jutro', checked: false },
    ]);

    const handleCheckboxChange = (id, setArray) => {
        setArray((prev) => {
            let newArray = [...prev];
            newArray = newArray.map((checkbox) =>
                checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox);
            return newArray;
        });
    }

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
            console.log(newDict);
            newDict[select] = e.target.value;
            return newDict;
        });
    };

    return (
        <div className='filters__container'>
            <p><b>Dodaj zadanie</b></p>
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
                <button className='btn main small'>DODAJ</button>
            </Card>
            <p><b>Filtry</b></p>
            <Card classes='filters'>
                <div className='select'>
                    <b>Zwierzaki</b>
                    <CheckBoxList
                        array={pets}
                        onChange={handleCheckboxChange}
                        setArray={setPets}
                    />
                </div>
                <div className='select'>
                    <b>Typ zadania</b>
                    <CheckBoxList
                        array={types}
                        onChange={handleCheckboxChange}
                        setArray={setType}
                    />
                </div>
                <div className='select'>
                    <b>Data</b>
                    <CheckBoxList
                        array={dates}
                        onChange={handleCheckboxChange}
                        setArray={setDate}
                    />
                </div>
            </Card>
        </div>
    )
}

export default TaskContentControls