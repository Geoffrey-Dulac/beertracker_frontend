import React from 'react';
import Form from '../components/Form';
import { Link } from "react-router-dom";

class Loginpage extends React.Component {
    handleLogin = (token) => {
        localStorage.setItem('token', token);
        this.props.history.push('/home');
    }

    render() {
        let api_url;
        if (process.env.NODE_ENV === 'development') {
            api_url = 'http://localhost:8000/'
        } else if (process.env.NODE_ENV === 'production') {
            api_url = 'https://beertracker-api.herokuapp.com/'
        }
        
        return (
            <div className='loginpage'>
                <div className='formcard'>
                    <div className='text-center'>
                        <h1>Beertracker</h1>
                        <h3>connexion</h3>                
                    </div>
                    <Form classes='mb-1' handleSubmission={(token) => this.handleLogin(token)} url={api_url + 'login'} buttonText='Se connecter' inputs={['email', 'password']} />
                    <Link to="/signup"><p className='text-dark mt-2'>Créer un compte</p></Link>
                </div>
            </div>
        );
    }
}

export default Loginpage;
