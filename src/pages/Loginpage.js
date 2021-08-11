import React from 'react';
import Form from '../components/Form.js';
import { Link } from "react-router-dom";

const Loginpage = () => {
    return (
        <div className='loginpage'>
            <div className='formcard'>
                <div className='text-center'>
                    <h1>Beertracker</h1>
                    <h3>connexion</h3>                
                </div>
                <Form classes='mb-3 bgprimary50' url='' buttonText='Se connecter' inputs={['username', 'password']} />
                <Link to="/signup"><p className='text-dark'>Créer un compte</p></Link>
            </div>
        </div>
    );
}

export default Loginpage;
