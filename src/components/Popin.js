import { render } from '@testing-library/react';
import React, { useState } from 'react';
import Popinstep from './Popinstep';

class Popin extends React.Component {

    constructor(props) {
        super(props);
        let objectInputs = {};
        Object.keys(this.props.elements).map((key) => {
            objectInputs[key] = '';
        })
        this.state = objectInputs;
        this.state['step'] = 1;
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

    render() {
        const stepsNumber = Object.keys(this.props.elements).length;
        const stepsName = Object.keys(this.props.elements)[this.state.step - 1];
        return (
            <div className='popin'>
                { Object.keys(this.props.elements).map((key, i) => {
                    if (i + 1 === this.state.step) {
                        return <Popinstep val={this.state[key]} handleChangeInput={(e) => this.handleChange(e)} key={i} step={this.state.step} name={key} question={this.props.elements[key]} />
                    }
                })}
                { this.state.step !== stepsNumber &&
                    <button className={this.state[stepsName] === '' ? 'mainbutton-disabled mt-2' : 'mainbutton mt-2'} onClick={this.handleNextStep}>Suivant</button>
                }
                { this.state.step === stepsNumber &&
                    <button className={this.state[stepsName] === '' ? 'mainbutton-disabled mt-2' : 'mainbutton mt-2'}>Valider</button>
                }
                { this.state.step !== 1 &&
                    <p onClick={this.handlePrevisousStep}>retour</p>
                }
            </div>
        );
    }
}

export default Popin;