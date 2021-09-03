import React, {useState} from 'react';
import close_cross from '../images/close_cross.png'
import beershow from '../images/beershow.png'
import beershow_smiling from '../images/beershow_smiling.png'
import Popinusergrade from './Popinusergrade';

function Beershow(props) {
    const [isPopinUsergradeOpen, setIsPopinUsergradeOpen] = useState(false);

    const handleOpenPopinUsergrade = () => {
        setIsPopinUsergradeOpen(true);
    }

    const handleClosePopin = () => {
        setIsPopinUsergradeOpen(false);
        props.handleCloseBeershow();
    }

    if (isPopinUsergradeOpen) {
        return (
            <Popinusergrade usergradeSaved={props.usergrade ? props.usergrade : ''} handleClosePopin={handleClosePopin}
            beername={props.beer.name} handleClosePopin={handleClosePopin} handleAlert={(obj) => props.handleAlert(obj)} />
        )
    } else {
        return (
            <div className='popin'>
                <img className='close-cross' onClick={props.handleCloseBeershow} src={close_cross} alt='close_cross' />
                <div className='d-flex justify-content-center align-items-center flex-column'>
                    <h3 className='text-center'><i className="fas fa-beer"></i> {props.beer.name}</h3>
                    <h4 className='text-center'><i className="fas fa-warehouse"></i> {props.brewer.name}</h4>
                    <p>{props.beer.degrees} °</p>
                    { props.usergrade && props.usergrade < 6 &&
                        <img src={beershow} className='beershowimg' alt='beershow' />
                    }
                    { props.usergrade && props.usergrade > 5 &&
                        <img src={beershow_smiling} className='beershowimg' alt='beershow' />
                    }
                    <p>{props.usergrade} <span className='outof10'>/10</span></p>
                    { props.usergrade || props.usergrade === 0
                        ? <button usergrade={props.usergrade} className='mainbutton' onClick={handleOpenPopinUsergrade}>Modifier ma note</button>
                        : <button className='mainbutton' onClick={handleOpenPopinUsergrade}>Noter cette bière</button>
                    }
                </div>
            </div>
        );
    }
}

export default Beershow;