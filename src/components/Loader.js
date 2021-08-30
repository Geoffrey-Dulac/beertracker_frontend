import React from 'react';
import loader from '../images/loader.gif'

function Loader(props) {
    return (
        <div className={props.classes ? props.classes : ''}>
            <img src={loader} alt="loader" className='loader' />
        </div>
    );
}

export default Loader;