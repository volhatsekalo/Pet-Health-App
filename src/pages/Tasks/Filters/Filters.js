import React, { useState } from 'react';
import './Filters.css';
import Card from '../../../components/Card/Card';
import { nanoid } from 'nanoid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Filters() {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    // sdfwsffdeadad
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
        { id: nanoid(5), name: 'Kiedykolwiek', checked: false },
    ]);

    const handleCheckboxChange = (id, setArray) => {
        setArray((prev) => {
            let newArray = [...prev];
            newArray = newArray.map((checkbox) =>
                checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox);
            return newArray;
        });
    }

    return (
        <div className='filters__container'>
            <p><b>Dodaj zadanie</b></p>
            <Card classes='add_task'>
                <p><b>Wybierz zwierzaka</b></p>
                <ul>
                    {pets.map((el) => (
                        <li>{el.name}</li>
                    ))}
                </ul>
                <p><b>Wybierz zadanie</b></p>
                <ul>
                    {types.map((el) => (
                        <li>{el.name}</li>
                    ))}
                </ul>
                <p><b>Wybierz datę</b></p>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Wybierz datę i godzinę"
                />
                <button className='btn main'>Dodaj</button>
            </Card>
            <p><b>Filtry</b></p>
            <div className='filters'>
                <div className='select'>
                    <b>ZWIERZAKI</b>
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
                    <b>TYP ZADANIA</b>
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
                    <b>DATA</b>
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