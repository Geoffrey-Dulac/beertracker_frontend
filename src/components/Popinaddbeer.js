import React, { useEffect, useState } from 'react';
import Popinbackground from './Popinbackground';
import Popin from './Popin';
import Popinloading from './Popinloading';

function Popinaddbeer(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [beers, setBeers] = useState([]);

    const datas = {name: 'Choisissez votre bière', user_grade: 'Quelle note lui attribueriez-vous ?'}

    useEffect(() => {
        let mounted = true
        const token = localStorage.getItem('token');
        if (token) {
            fetch ('http://localhost:8000/beers_names', {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => res.json())
            .then(
                (data) => {
                    if (data.message === 'Please log in') {
                        props.history.push('/login');
                    } else if (mounted) {
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

        return function cleanup() {
            mounted = false
        }
    }, [])

    if (isLoaded) {
        return (
            <div>
                <Popinbackground />
                <Popin autocomplete_beers={beers} autocomplete_step={1} elements={datas} />
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