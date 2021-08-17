import React from 'react';

function Popinstep(props) {

    return (
        <div className='popin-step'>
            <h3>{props.question}</h3>
            <input onChange={(e) => props.handleChangeInput(e)} value={props.val} name={props.name} />
        </div>
    );
}

export default Popinstep;