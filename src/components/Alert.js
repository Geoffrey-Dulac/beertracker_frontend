import React from 'react';
import close_cross from '../images/close_cross.png'

function Alert(props) {
    return (
        <div className={'alert-band ' + props.alertType }> 
            <p className='mb-0'>{props.text}</p>
            <img className='close-cross' onClick={props.closeAlert} src={close_cross} alt='close_cross' />
        </div>
    );
}

export default Alert;