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

    const fetchBeers = () => {
        setIsLoaded(false);
        fetchData('http://localhost:8000/beers')
            .then((response) => {
                setBeers(response.beers);
                setIsLoaded(true);
            });
    }

    useEffect(() => {
        fetchBeers();
    }, [])

    const handleCloseAlert = () => {
        setIsAlertOpen(false);
    }

    const handleAlert = (obj) => {
        setAlertText(obj.message);
        setAlertClass(obj.class);
        setIsAlertOpen(true);
        setTimeout(() => {
            setIsAlertOpen(false);
        }, 4000)
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