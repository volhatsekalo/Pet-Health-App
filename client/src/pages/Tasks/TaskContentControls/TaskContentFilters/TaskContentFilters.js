import React, { useState, useEffect } from 'react';
import Card from '../../../../components/Card/Card';
import CheckBoxList from '../../../../components/CheckBoxList/CheckBoxList';
import { nanoid } from 'nanoid';

function TaskContentFilters({props}) {

    const [pets, setPets] = useState([]);

    useEffect(() => {
        const getPets = async () => {
            try {
                setPets(() => {
                    return props;
                })
            }
            catch (err) {
                console.error('Błąd po stronie serwera:', err);
            }
        };
        getPets();
    }, [props]);


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

    const filterTasks = () => {
        // const selectedTypes = types.filter((type) => {
        //     type.checked == true;
        // });
        // const selectedPets = pets.filter((pet) => {
        //     pet.checked == true;
        // });
        // const selectedDates = pets.filter((date) => {
        //     date.checked == true;
        // });
    }

    return (
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
            <button className='btn main small'>FILTRUJ</button>
        </Card>
    )
}

export default TaskContentFilters