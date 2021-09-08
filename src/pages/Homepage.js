import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Alert from '../components/Alert';
import Beercards from '../components/Beercards';
import Popinaddbeer from '../components/Popinaddbeer';
import Loader from '../components/Loader';
import fetchData from '../functions';


function Homepage() {
    const [username, setUsername] = useState('');
    const [user_beers, setUserbeers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [alertClass, setAlertClass] = useState('');
    const [alertText, setAlertText] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isPopinAddBeer, setIsPopinAddBeer] = useState(false);

    const handleAddBeerClick = () => {
        setIsPopinAddBeer(true);
    }

    const handleCloseAlert = () => {
        setIsAlertOpen(false);
    }

    async function handleAlert(obj) {
        await fetchUserBeers();
        setAlertText(obj.message);
        setAlertClass(obj.class);
        setIsAlertOpen(true);
        setTimeout(() => {
            setIsAlertOpen(false);
        }, 5000)
    }

    function fetchUserBeers() {
        return new Promise(resolve => {
            setIsLoaded(false);
            fetchData('http://localhost:8000/user_beers')
            .then((response) => {
                setUsername(response.username);
                setUserbeers(response.user_beers);
                setIsLoaded(true);
                resolve();
            });
        })
    }

    const handleClosePopin = () => {
        setIsPopinAddBeer(false);
        fetchUserBeers();
    }

    useEffect(() => {
        fetchUserBeers();
    }, [])

    if (isLoaded) {

        return (
            <div className="container-pages">
                <Menu />
                { isAlertOpen &&
                    <Alert alertType={alertClass} text={alertText} closeAlert={handleCloseAlert} />
                }
                { !isAlertOpen &&
                    <Alert alertType={alertClass + ' opacity0'} text={alertText} closeAlert={handleCloseAlert} />
                }
                <h1>Hello {username}</h1>
                <Beercards handleAlert={(obj) => handleAlert(obj)} searchFeature={true} beers={user_beers} header='Mon classement bières' beersLength={5} />
                <button className='mainbutton position-cta-fixed py-3 px-5' onClick={handleAddBeerClick}>J'ajoute une bière</button>
                { isPopinAddBeer &&
                    <Popinaddbeer handleAlert={(obj) => handleAlert(obj)} handleClosePopin={handleClosePopin} />
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