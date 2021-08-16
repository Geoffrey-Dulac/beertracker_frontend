import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Beercard from '../components/Beercard';

function Homepage(props) {
    const [username, setUsername] = useState('');
    const [user_beers, setUserbeers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
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
                    console.log(data);
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
    }, [])

    if (isLoaded) {
        return (
            <div>
                <Menu />
                <h1>Hello {username}</h1>
                <div>
                    {user_beers.map((userbeer, i) => {
                        return <Beercard key={userbeer[i].name} name={userbeer[i].name} degrees={userbeer[i].degrees} 
                        kind={userbeer[i].kind} usergrade={userbeer['user_grade']} />
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Menu />
                <h1>Hello {username}</h1>
                <div>
                    chargement...
                </div>
            </div>
        )
    }
}

export default Homepage;