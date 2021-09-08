import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Loader from '../components/Loader';
import Beercards from '../components/Beercards';
import fetchData from '../functions';
import Alert from '../components/Alert';

function BeersRankingpage() {
    const [beers, setBeers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [alertClass, setAlertClass] = useState('');
    const [alertText, setAlertText] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    let api_url;
    if (process.env.NODE_ENV === 'development') {
        api_url = 'http://localhost:8000/'
    } else if (process.env.NODE_ENV === 'production') {
        api_url = 'https://beertracker-api.herokuapp.com/'
    }

    function fetchBeers() {
        return new Promise(resolve => {
            setIsLoaded(false);
            fetchData(`${api_url}beers`)
                .then((response) => {
                    setBeers(response.beers);
                    setIsLoaded(true);
                    resolve();
                });
        });
    }

    useEffect(() => {
        fetchBeers();
    }, [])

    const handleCloseAlert = () => {
        setIsAlertOpen(false);
    }

    async function handleAlert(obj) {
        await fetchBeers();
        setAlertText(obj.message);
        setAlertClass(obj.class);
        setIsAlertOpen(true);
        setTimeout(() => {
            setIsAlertOpen(false);
        }, 5000)
    }

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
                <Beercards handleAlert={(obj) => handleAlert(obj)} searchFeature={true} beers={beers} header='Toutes les bières' beersLength={20} />
            </div>
        )
    } else {
        return (
            <Loader />
        )
    }
}

export default BeersRankingpage;