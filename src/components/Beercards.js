import React, { useState } from 'react';
import Beercard from './Beercard';

function Beercards(props) {
    const beersLenghtInitial = props.beersLength;
    const [beersLenght, setBeersLenght] = useState(beersLenghtInitial);
    const [matchingBeers, setMatchingBeers] = useState(props.beers);

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

    const handleSearchChange = (e) => {
        setMatchingBeers(
            props.beers.filter(({beer, brewer}) => {
                if (brewer.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                    return beer;
                }
                return beer.name.toLowerCase().includes(e.target.value.toLowerCase());
            })
        );
    }

    return (
        <div>
            <div className='d-flex justify-content-between mt-5'>
                <h3>{props.header}</h3>
                { beersLenght > beersLenghtInitial && 
                    <p className='cpointer seeless' onClick={(e) => handleClickSeeLess(e)}>Voir moins</p>
                }
            </div>
            { props.searchFeature &&
                <input className='my-4' placeholder='rechercher' onChange={handleSearchChange} />
            }
            <div>
                { matchingBeers.map(({beer, brewer, user_grade}, i) => {
                    if (i < beersLenght) {
                        return <Beercard key={beer.name} name={beer.name} degrees={beer.degrees} 
                        kind={beer.kind} usergrade={user_grade} brewer={brewer} />
                    } else {
                        return '';
                    }
                })}
            </div>
            { beersLenght < matchingBeers.length && 
                <div className='text-center seemore'>
                    <p><span onClick={handleClickSeeMore} className='cpointer'>Voir plus</span></p>
                </div>
            }
        </div>
    );
}

export default Beercards;