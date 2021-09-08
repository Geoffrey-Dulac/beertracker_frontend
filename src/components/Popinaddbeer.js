import React, { useEffect, useState } from 'react';
import Popinbackground from './Popinbackground';
import Popin from './Popin';
import Popinloading from './Popinloading';

function Popinaddbeer(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [beers, setBeers] = useState([]);
    let api_url;
    if (process.env.NODE_ENV === 'development') {
        api_url = 'http://localhost:8000/'
    } else if (process.env.NODE_ENV === 'production') {
        api_url = 'https://beertracker-api.herokuapp.com/'
    }

    const datas = {name: 'Choisissez votre bière', user_grade: 'Quelle note lui attribueriez-vous ?'}

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch (`${api_url}beers_names`, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => res.json())
            .then(
                (data) => {
                    if (data.message === 'Please log in') {
                        props.history.push('/login');
                    } else {
                        setBeers(data.beers);
                        setIsLoaded(true);
                    }
                },
                () => {
                    props.history.push('/login');
                }
            )
        } else {
            props.history.push('/login');
        }
    }, [props.history, api_url])



    if (isLoaded) {
        return (
            <div>
                <Popinbackground />
                <Popin url_request={api_url + 'create_user_beer'} handleAlertWarning={(obj) => props.handleAlert(obj)} 
                    handleAlertSuccess={() => props.handleAlert({message: 'Bière ajoutée avec succès', class:'alert-success'})} 
                    handleClosePopin={props.handleClosePopin} autocomplete_beers={beers} autocomplete_step={1} elements={datas} />
            </div>
        );
    } else {
        return (
            <div>
                <Popinbackground />
                <Popinloading />
            </div>
        );
    }
}

export default Popinaddbeer;