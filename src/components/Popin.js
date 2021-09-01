import React from 'react';
import Popinstep from './Popinstep';
import close_cross from '../images/close_cross.png'

class Popin extends React.Component {

    constructor(props) {
        super(props);
        let objectInputs = {};
        Object.keys(this.props.elements).forEach((key) => {
            if (key === 'user_grade') {
                objectInputs[key] = 5;
            } else {
                objectInputs[key] = '';
            }
        })
        this.state = objectInputs;
        this.state['step'] = 1;
        this.state['beers'] = props.autocomplete_beers;
    }

    handleNextStep = () => {
        this.setState({ step: this.state.step + 1 })
    }

    handlePrevisousStep = () => {
        this.setState({ step: this.state.step - 1 })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSelectAutocomplete = (e) => {
        this.setState({ name: e.target.innerText });
    }

    handlePlusButton = () => {
        if (parseInt(this.state.user_grade) > -1 && parseInt(this.state.user_grade) < 10) {
            this.setState({ user_grade: parseInt(this.state.user_grade) + 1 });
        }
    }

    handleLessButton = () => {
        if (parseInt(this.state.user_grade) > 0 && parseInt(this.state.user_grade) < 11) {
            this.setState({ user_grade: parseInt(this.state.user_grade) - 1 });
        }
    }

    handleClosePopin = (e) => {
        this.props.handleClosePopin(e);
    }

    handleSubmission = (e) => {
        e.target.classList.remove('mainbutton');
        e.target.classList.add('mainbutton-disabled');
        const token = localStorage.getItem('token');
        let dataObject = {};
        Object.keys(this.props.elements).forEach((key) => {
            dataObject[key] = this.state[key];
        })
        fetch (this.props.url_request, {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(dataObject)
        })
        .then((res) => res.json())
        .then(
            (data) => {
                if (data.status === 'success') {
                    this.props.handleClosePopin(e);
                    this.props.handleAlertSuccess();
                } else {
                    this.props.handleClosePopin(e);
                    this.props.handleAlertWarning({message: data.message, class: 'alert-danger'});
                } 
            },
            () => {
                this.props.history.push('/login');
            }
        )
    }

    render() {
        const stepsNumber = Object.keys(this.props.elements).length;
        const stepsName = Object.keys(this.props.elements)[this.state.step - 1];

        return (
            <div className='popin'>
                <img className='close-cross' onClick={(e) => this.handleClosePopin(e)} src={close_cross} alt='close_cross' />
                { Object.keys(this.props.elements).map((key, i) => {
                    if (i + 1 === this.state.step) {
                        if (this.state.step === this.props.autocomplete_step) {
                            return <Popinstep handleSelectAutocomplete={(e) => this.handleSelectAutocomplete(e)} autocomplete_beers={this.props.autocomplete_beers} val={this.state[key]} handleChangeInput={(e) => this.handleChange(e)} key={i} step={this.state.step} name={key} question={this.props.elements[key]} />
                        } else {
                            return <Popinstep handleLessButton={this.handleLessButton} handlePlusButton={this.handlePlusButton} val={this.state[key]} handleChangeInput={(e) => this.handleChange(e)} key={i} step={this.state.step} name={key} question={this.props.elements[key]} />
                        }
                    } else {
                        return '';
                    }
                })}
                { this.state.step === this.props.autocomplete_step &&
                    <button className={this.state[stepsName] === '' || this.state.beers.indexOf(this.state[stepsName]) === -1  ? 'mainbutton-disabled mt-2' : 'mainbutton mt-2'} onClick={this.handleNextStep}>Suivant</button>
                }
                { this.state.step !== stepsNumber && this.state.step !== this.props.autocomplete_step &&
                    <button className={this.state[stepsName] === '' ? 'mainbutton-disabled mt-2' : 'mainbutton mt-2'} onClick={this.handleNextStep}>Suivant</button>
                }
                { this.state.step === stepsNumber && this.state.step !== this.props.autocomplete_step &&
                    <button onClick={(e) => this.handleSubmission(e)} className={this.state[stepsName] === '' ? 'mainbutton-disabled mt-2' : 'mainbutton mt-2'}>Valider</button>
                }
                { this.state.step !== 1 &&
                    <p className='cpointer' onClick={this.handlePrevisousStep}>retour</p>
                }
            </div>
        );
    }
}

export default Popin;