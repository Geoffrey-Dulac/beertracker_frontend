import React, { useEffect, useState } from 'react';
import Beercard from './Beercard';

function Beercards(props) {
    const beersLenghtInitial = props.beersLength;
    const [beersLenght, setBeersLenght] = useState(beersLenghtInitial);

    const handleClickSeeMore = () => {
        setBeersLenght(beersLenght + beersLenghtInitial);
    }

    const handleClickSeeLess = () => {
        if (beersLenght - beersLenghtInitial < beersLenghtInitial) {
            setBeersLenght(beersLenghtInitial);
        } else {
            setBeersLenght(beersLenght - beersLenghtInitial);
        }
    }

    return (
        <div>
            <div className='d-flex justify-content-between mt-5'>
                <h3>{props.header}</h3>
                { beersLenght > beersLenghtInitial && 
                    <p className='cpointer seeless' onClick={handleClickSeeLess}>Voir moins</p>
                }
            </div>
            <div>
                { props.beers.map(({beer, brewer, user_grade}, i) => {
                    if (i < beersLenght) {
                        return <Beercard key={beer.name} name={beer.name} degrees={beer.degrees} 
                        kind={beer.kind} usergrade={user_grade} brewer={brewer} />
                    } else {
                        return '';
                    }
                })}
            </div>
            { beersLenght < props.beers.length && 
                <div className='text-center seemore'>
                    <p><span onClick={handleClickSeeMore} className='cpointer'>Voir plus</span></p>
                </div>
            }
        </div>
    );
}

export default Beercards;