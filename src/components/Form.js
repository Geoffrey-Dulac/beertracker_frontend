import React from 'react';

const Form = (props) => {
    return (
        <div className='formstructure w-100 px-5 py-3'>
            {props.inputs.map((item) =>
                item == 'password'
                    ? <input placeholder={item} name={item} className={props.classes} type={item}/>
                    : <input placeholder={item} name={item} className={props.classes}/>
            )}
            <button className='mainbutton'>{props.buttonText}</button>
        </div>
    );
}

export default Form;