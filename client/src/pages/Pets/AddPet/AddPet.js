import { React, useState } from 'react';
import './AddPet.css';

function AddPet({ setPets }) {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [weight, setWeight] = useState('');
    const [status, setStatus] = useState('');
    const [messageState, setMessageState] = useState('green');

    const handleAddPet = async () => {
        try {
            const response = await fetch('http://localhost:3001/pets', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, breed, currentWeight: weight, petAvatarUrl: "" }),
            });

            const data = await response.json();

            if (response.ok) {
                const response2 = await fetch(`http://localhost:3001/pets/${data.pet._id}/weights`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ currentWeight: weight, pet: data.pet._id }),
                });

                const data2 = await response2.json();

                if (!response.ok) {
                    setStatus(data2.message);
                    setMessageState('red');
                }
                else {
                    setPets((prev) => {
                        let newArray = [...prev];
                        newArray.push(data.pet);
                        return newArray;
                    });
                    setName('');
                    setBreed('');
                    setWeight('');
                    setMessageState('green');
                    setStatus(data.message);
                }
            }
            if (!response.ok) {
                setMessageState('red');
                setStatus("Nie udało się dodać zwierzaka");
            }
            
        }
        catch (err) {
            setStatus(err);
        }

    };
    return (
        <div className='add_pet__container'>
            <b>Dodaj Zwierzę</b>
            <input type="text" placeholder="Imię" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Rasa" value={breed} onChange={(e) => setBreed(e.target.value)} />
            <input type="text" placeholder="Waga w kg" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <button className='btn main' onClick={handleAddPet}>Dodaj</button>
            <div className={messageState}>{status}</div>
        </div>
    )
}

export default AddPet