import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Beercard from '../components/Beercard';
import Loader from '../components/Loader';
import Beercards from '../components/Beercards';
import fetchData from '../functions'

function BeersRankingpage() {
    const [beers, setBeers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const beersLenghtInitial = 10;
    const [beersLenght, setBeersLenght] = useState(beersLenghtInitial);

    useEffect(() => {
        fetchData('http://localhost:8000/beers')
            .then((response) => {
                setBeers(response.beers);
                setIsLoaded(true);
                console.log(response);
            });
    }, [])

    if (isLoaded) {
        return (
            <div className="container-pages">
                <Menu />
                <Beercards beers={beers} header='Toutes les bières' beersLength={10} />
            </div>
        )
    } else {
        return (
            <Loader />
        )
    }
}

export default BeersRankingpage;