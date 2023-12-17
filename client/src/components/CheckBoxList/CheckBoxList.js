import React from 'react'
import { nanoid } from 'nanoid'

function CheckBoxList({array, onChange, setArray}) {
    return (
        <div className='checkboxes'>
            {array.map((checkbox) => (
                <label key={nanoid(3)}>
                    <input
                        type="checkbox"
                        checked={checkbox.checked}
                        readOnly
                        onChange={() => onChange(checkbox.id, setArray)}
                    />
                    {checkbox.name}
                </label>
            ))}
        </div>
    )
}

export default CheckBoxList