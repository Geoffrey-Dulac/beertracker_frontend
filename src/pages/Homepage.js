import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Beercards from '../components/Beercards';
import Popinaddbeer from '../components/Popinaddbeer';
import Loader from '../components/Loader';
import fetchData from '../functions';


function Homepage() {
    const [username, setUsername] = useState('');
    const [user_beers, setUserbeers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPopinAddBeer, setIsPopinAddBeer] = useState(false);

    const handleAddBeerClick = () => {
        setIsPopinAddBeer(true);
    }

    const handleClosePopin = () => {
        setIsPopinAddBeer(false);
        fetchData('http://localhost:8000/user_beers') 
            .then((response) => {
                setUsername(response.username);
                setUserbeers(response.user_beers);
                setIsLoaded(true);
            });;
    }

    useEffect(() => {
        fetchData('http://localhost:8000/user_beers')
            .then((response) => {
                setUsername(response.username);
                setUserbeers(response.user_beers);
                setIsLoaded(true);
            });
    }, [])

    if (isLoaded) {

        return (
            <div className="container-pages">
                <Menu />
                <h1>Hello {username}</h1>
                <Beercards searchFeature={true} beers={user_beers} header='Mon classement bières' beersLength={5} />
                <button className='mainbutton position-cta-fixed py-3 px-5' onClick={handleAddBeerClick}>J'ajoute une bière</button>
                { isPopinAddBeer &&
                    <Popinaddbeer handleClosePopin={handleClosePopin}/>
                }
            </div>
        )
    } else {
        return (
            <Loader />
        )
    }
}

export default Homepage;