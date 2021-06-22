import React from 'react'
import { Input } from 'reactstrap';

function Calendar({ h5, name, onChange }) {

    return (
        <div>
            <h5>{h5}</h5>
            <Input type="date" name={name} onChange={onChange} />
        </div>
    );
}

export default Calendar