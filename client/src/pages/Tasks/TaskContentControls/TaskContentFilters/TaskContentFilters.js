import React, { useState, useEffect } from 'react';
import Card from '../../../../components/Card/Card';
import CheckBoxList from '../../../../components/CheckBoxList/CheckBoxList';
import { nanoid } from 'nanoid';

function TaskContentFilters({ petsList, tasks, setFilteredTasks }) {

    const [pets, setPets] = useState([]);

    useEffect(() => {
        const getPets = async () => {
            try {
                setPets(() => {
                    return petsList;
                })
            }
            catch (err) {
                console.error('Błąd po stronie serwera:', err);
            }
        };
        getPets();
    }, [petsList]);


    const [types, setType] = useState([
        { id: nanoid(5), name: 'lek', checked: false },
        { id: nanoid(5), name: 'szczepienie', checked: false },
        { id: nanoid(5), name: 'wizyta u weterynarza', checked: false },
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

    const sameDay = (date1, date2) => {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }

    const filterTasksWithDates = (arr) => {
        const today = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        if (dates[0].checked && dates[1].checked) {
            return arr.filter((task) => sameDay(today, new Date(task.date)) || sameDay(tomorrow, new Date(task.date)));
        }
        else if (dates[0].checked) {
            return arr.filter((task) => sameDay(today, new Date(task.date)));
        }
        else {
            return arr.filter((task) => sameDay(tomorrow, new Date(task.date)));
        }
    }

    const filterTasks = () => { 
        let selectedTypes = types.filter((type) => type.checked == true);
        selectedTypes = selectedTypes.length > 0 ? selectedTypes.map((type) => type.name) : types.map((type) => type.name);
        // jesli nie ma zaznaczonych, chcemy wyswietlic wszystkie
        let selectedPets = pets.filter((pet) => pet.checked == true);
        selectedPets = selectedPets.length > 0 ? selectedPets.map((type) => type.name) : pets.map((type) => type.name);
        const selectedDates = dates.filter((date) => date.checked == true);
        //wzorujesz sie na tasks, a modyfikujesz filtered task

        console.log(selectedTypes);
        console.log(selectedPets);
        setFilteredTasks(() => {
            let newArray = [...tasks];
            newArray = newArray.filter((element) => selectedTypes.includes(element.taskType) && selectedPets.includes(element.petName));
            newArray = selectedDates.length > 0 ? filterTasksWithDates(newArray) : newArray;
            console.log(newArray);
            return newArray;
        });
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
            <button className='btn main small' onClick={filterTasks}>FILTRUJ</button>
        </Card>
    )
}

export default TaskContentFilters