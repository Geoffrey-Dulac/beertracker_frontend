import React from 'react';
import close_cross from '../images/close_cross.png'
import beershow from '../images/beershow.png'

function Beershow(props) {
    return (
        <div className='popin'>
            <img className='close-cross' onClick={props.handleCloseBeershow} src={close_cross} alt='close_cross' />
            <div className='d-flex justify-content-center align-items-center flex-column'>
                <h3 className='text-center'>{props.beer.name}</h3>
                <h4 className='text-center'>Brasserie : {props.brewer.name}</h4>
                <img src={beershow} className='beershowimg' alt='beershow' />
                <p>{props.beer.degrees}°</p>
                <p>{props.usergrade} <span className='outof10'>/10</span></p>
            </div>
        </div>
    );
}

export default Beershow;