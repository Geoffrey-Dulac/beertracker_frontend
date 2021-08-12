import React, { useState, useEffect } from 'react';

function Homepage() {
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
                if (data.message) {
                    this.props.history.push('/login');
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
            { username !== '' &&
                <p>hello {username}</p>
            }
        </div>
    );
}

export default Homepage;