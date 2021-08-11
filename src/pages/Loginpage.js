import React from 'react';
import Form from '../components/Form.js';
import { Link } from "react-router-dom";

class Loginpage extends React.Component {
    handleLoginpage = (user) => {
        console.log(user);
    }

    render() {
        return (
            <div className='loginpage'>
                <div className='formcard'>
                    <div className='text-center'>
                        <h1>Beertracker</h1>
                        <h3>connexion</h3>                
                    </div>
                    <Form handleLogin={(user) => this.handleLoginpage(user)} handleclasses='mb-3 bgprimary50' url='http://localhost:8000/login' buttonText='Se connecter' inputs={['username', 'password_digest']} />
                    <Link to="/signup"><p className='text-dark'>Créer un compte</p></Link>
                </div>
            </div>
        );
    }
}

export default Loginpage;
