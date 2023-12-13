import React, { useState } from 'react';
import './Filters.css';
import Card from '../../../components/Card/Card';
import Select from '../../../components/Select/Select';
import { nanoid } from 'nanoid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Filters() {
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
            let newDict = {...prev};
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
                    onChange={(e) => handleSelectChange(e, 'petChoice')}/>
                {/* <select value={selectedOptions.petChoice} onChange={(e) => handleSelectChange(e, 'petChoice')}>
                    {pets.map((el) => (
                        <option value={el.name} key={el.id}>{el.name}</option>
                    ))}
                </select> */}
                <p><b>Wybierz zadanie</b></p>
                <Select
                    array={types}
                    value={selectedOptions.taskChoice}
                    onChange={(e) => handleSelectChange(e, 'taskChoice')}/>
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
            <div className='filters'>
                <div className='select'>
                    <b>Zwierzaki</b>
                    <div className='checkboxes'>
                        {pets.map((checkbox) => (
                            <label key={checkbox.id}>
                                <input
                                    type="checkbox"
                                    name={checkbox.name}
                                    checked={checkbox.checked}
                                    onChange={() => handleCheckboxChange(checkbox.id, setPets)}
                                />
                                {checkbox.name}
                            </label>
                        ))}
                    </div>
                </div>
                <div className='select'>
                    <b>Typ zadania</b>
                    <div className='checkboxes'>
                        {types.map((checkbox) => (
                            <label key={nanoid(3)}>
                                <input
                                    type="checkbox"
                                    checked={checkbox.checked}
                                    readOnly
                                    onChange={() => handleCheckboxChange(checkbox.id, setType)}
                                />
                                {checkbox.name}
                            </label>
                        ))}
                    </div>
                </div>
                <div className='select'>
                    <b>Data</b>
                    <div className='checkboxes'>
                        {dates.map((checkbox) => (
                            <label key={nanoid(3)}>
                                <input
                                    type="checkbox"
                                    checked={checkbox.checked}
                                    readOnly
                                    onChange={() => handleCheckboxChange(checkbox.id, setDate)}
                                />
                                {checkbox.name}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filters