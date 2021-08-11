import React from 'react';
import Form from '../components/Form.js';
import { Link } from "react-router-dom";

class Signuppage extends React.Component {
    handleSignuppage = (user) => {
        console.log(user);
    }

    render() {
        return (
            <div className='signuppage'>
                <div className='formcard'>
                    <div className='text-center'>
                        <h1>Beertracker</h1>
                        <h3>inscription</h3>                
                    </div>
                    <Form handleLogin={(user) => this.handleSignuppage(user)} classes='mb-3 bgprimary50' url='' buttonText="S'inscrire" inputs={['username', 'email', 'password']} />
                    <Link to="/login"><p className='text-dark'>Se connecter</p></Link>
                </div>
            </div>
        );
    }
}

export default Signuppage;
