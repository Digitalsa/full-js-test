import React from 'react'
import { Input, FormFeedback } from 'reactstrap';

function Calendar({ h5, name, onChange, dateInvalid }) {

    return (
        <div>
            <h5>{h5}</h5>
            <Input type="date" name={name} onChange={onChange} invalid={dateInvalid} />
            <FormFeedback>Selecione uma data!</FormFeedback>
        </div>
    );
}

export default Calendar