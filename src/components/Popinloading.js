import React from 'react';
import loader from '../images/loader.gif'

function Popinloading(props) {
    return (
        <div className='popin'>
            <img src={loader} alt="loader" className='loader' />
        </div>
    );
}

export default Popinloading;