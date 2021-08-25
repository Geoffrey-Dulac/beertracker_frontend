import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Beercard from '../components/Beercard';
import Popinaddbeer from '../components/Popinaddbeer';
import loader from '../images/loader.gif'


function Homepage(props) {
    const [username, setUsername] = useState('');
    const [user_beers, setUserbeers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userBeerCounter, setUserBeerCounter] = useState(5);
    const [isPopinAddBeer, setIsPopinAddBeer] = useState(false);
    const userBeersLenghtInitial = 5;

    const handleAddBeerClick = () => {
        setIsPopinAddBeer(true);
    }

    const handleClosePopin = () => {
        setIsPopinAddBeer(false);
        fetchUserBeers();
    }

    const handleClickSeeMore = () => {
        setUserBeerCounter(userBeerCounter + 3);
    }

    const handleClickSeeLess = () => {
        if (userBeerCounter - 3 < userBeersLenghtInitial) {
            setUserBeerCounter(userBeersLenghtInitial);
        } else {
            setUserBeerCounter(userBeerCounter - 3);
        }
    }

    const fetchUserBeers = () => {
        const token = localStorage.getItem('token');
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
                    } else {
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
    }

    useEffect(() => {
        fetchUserBeers();
    }, [])

    if (isLoaded) {

        return (
            <div className="container-pages">
                <Menu />
                <h1>Hello {username}</h1>
                <div className='d-flex justify-content-between mt-5'>
                    <h3>Mon classement bières</h3>
                    { userBeerCounter > userBeersLenghtInitial && 
                        <p className='cpointer' onClick={handleClickSeeLess}>Voir moins</p>
                    }
                </div>
                <div>
                    { user_beers.map((userbeer, i) => {
                        if (i < userBeerCounter) {
                            return <Beercard key={userbeer[i].name} name={userbeer[i].name} degrees={userbeer[i].degrees} 
                            kind={userbeer[i].kind} usergrade={userbeer['user_grade']} brewer={userbeer['brewer']} />
                        }
                    })}
                </div>
                { userBeerCounter < user_beers.length && 
                    <div className='text-center seemore'>
                        <p><span onClick={handleClickSeeMore} className='cpointer'>Voir plus</span></p>
                    </div>
                }
                <button className='mainbutton position-cta-fixed py-3 px-5' onClick={handleAddBeerClick}>J'ajoute une bière</button>
                { isPopinAddBeer &&
                    <Popinaddbeer handleClosePopin={handleClosePopin}/>
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