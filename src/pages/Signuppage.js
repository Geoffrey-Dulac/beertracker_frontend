import React from 'react';
import Form from '../components/Form';
import { Link } from "react-router-dom";

class Signuppage extends React.Component {
    handleSignup = (token) => {
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
            <div className='signuppage'>
                <div className='formcard'>
                    <div className='text-center'>
                        <h1>Beertracker</h1>
                        <h3>inscription</h3>                
                    </div>
                    <Form handleSubmission={(token) => this.handleSignup(token)} classes='mb-1' url={api_url + 'users'} buttonText="S'inscrire" inputs={['username', 'email', 'password']} />
                    <Link to="/login"><p className='text-dark mt-2'>Se connecter</p></Link>
                </div>
            </div>
        );
    }
}

export default Signuppage;
