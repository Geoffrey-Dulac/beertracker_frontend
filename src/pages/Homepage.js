import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Beercard from '../components/Beercard';
import Popinaddbeer from '../components/Popinaddbeer';
import loader from '../images/loader.gif'


function Homepage(props) {
    const [username, setUsername] = useState('');
    const [user_beers, setUserbeers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPopinAddBeer, setIsPopinAddBeer] = useState(false);

    const handleAddBeerClick = () => {
        setIsPopinAddBeer(true);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        let mounted = true;
        if (token) {
            fetch ('http://localhost:8000/user_beers', {
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
                        setUsername(data.username);
                        setUserbeers(data.user_beers);
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
            <div className="container-pages">
                <Menu />
                <h1>Hello {username}</h1>
                <h3 className='mt-5'>Mon classement bières</h3>
                <div>
                    { user_beers.map((userbeer, i) => {
                        if (i < 5) {
                            return <Beercard key={userbeer[i].name} name={userbeer[i].name} degrees={userbeer[i].degrees} 
                            kind={userbeer[i].kind} usergrade={userbeer['user_grade']} brewer={userbeer['brewer']} />
                        }
                    })}
                </div>
                <button className='mainbutton position-cta-fixed' onClick={handleAddBeerClick}>J'ajoute une bière</button>
                { isPopinAddBeer &&
                    <Popinaddbeer />
                }
            </div>
        )
    } else {
        return (
            <div>
                <img src={loader} alt="loader" className='loader' />
            </div>
        )
    }
}

export default Homepage;