import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Loader from '../components/Loader';
import Beercards from '../components/Beercards';
import fetchData from '../functions'

function BeersRankingpage() {
    const [beers, setBeers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchData('http://localhost:8000/beers')
            .then((response) => {
                setBeers(response.beers);
                setIsLoaded(true);
            });
    }, [])

    if (isLoaded) {
        return (
            <div className="container-pages">
                <Menu />
                <Beercards searchFeature={true} beers={beers} header='Toutes les bières' beersLength={10} />
            </div>
        )
    } else {
        return (
            <Loader />
        )
    }
}

export default BeersRankingpage;