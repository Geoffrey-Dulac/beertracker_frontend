import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';

function Homepage(props) {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch ('http://localhost:8000/beers', {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.message === 'Please log in') {
                    props.history.push('/login');
                } else {
                    setUsername(data.username);
                }
            })
        } else {
            this.props.history.push('/login');
        }
    })

    return (
        <div>
            <Menu />
        </div>
    );
}

export default Homepage;