import React from 'react';
import Form from '../components/Form.js';

const Loginpage = () => {
    return (
        <div className='loginpage'>
            <div className='formcard'>
                <div class='text-center'>
                    <h1>Beertracker</h1>
                    <h3>connexion</h3>                
                </div>
                <Form classes='mb-3 bgprimary50' url='' buttonText='Se connecter' inputs={['username', 'password']} />
                <p>Créer un compte</p>
            </div>
        </div>
    );
}

export default Loginpage;
