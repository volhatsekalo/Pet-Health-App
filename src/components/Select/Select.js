import React from 'react'

function Select({array, value, onChange}) {
    return (
        <select value={value} onChange={onChange}>
            {array.map((el) => (
                <option value={el.name} key={el.id}>{el.name}</option>
            ))}
        </select>
    )
}

export default Select