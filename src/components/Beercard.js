import React from 'react';
import logo_beer_bottle from '../images/logo_beer_bottle.png'

function Beercard(props) {
    const truncate = (str, number) => {
        return str.length > number ? str.substring(0, number - 3) + "..." : str;
    }

    return (
        <div className='beercard'> 
            <div className='width-parts-card-large d-flex align-items-center'>
                <img className='logo_beer_card' src={logo_beer_bottle} alt='logo_beer_bottle' />
                <div>      
                    <p className='bold mb-0'>{truncate(props.name, 24)}</p>
                    <p className='mb-0 cgrey200'>Brasserie {truncate(props.brewer.name, 19)}</p>
                </div> 
            </div>
            <p className='width-parts-card mb-0 d-none d-md-block'>{props.brewer.city}</p>
            <p className='width-parts-card mb-0 d-none d-md-block'>{props.degrees}°</p>
            <p className='width-parts-card mb-0'>{props.usergrade} <span className='outof10'>/10</span></p>
        </div>
    );
}

export default Beercard;