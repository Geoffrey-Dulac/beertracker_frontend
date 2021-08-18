import React from 'react';
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
        this.setState({ user_grade: parseInt(this.state.user_grade) + 1 });
    }

    handleLessButton = () => {
        this.setState({ user_grade: parseInt(this.state.user_grade) - 1 });
    }

    render() {
        const stepsNumber = Object.keys(this.props.elements).length;
        const stepsName = Object.keys(this.props.elements)[this.state.step - 1];

        return (
            <div className='popin'>
                { Object.keys(this.props.elements).map((key, i) => {
                    if (i + 1 === this.state.step) {
                        if (this.state.step === this.props.autocomplete_step) {
                            return <Popinstep handleSelectAutocomplete={(e) => this.handleSelectAutocomplete(e)} autocomplete_beers={this.props.autocomplete_beers} val={this.state[key]} handleChangeInput={(e) => this.handleChange(e)} key={i} step={this.state.step} name={key} question={this.props.elements[key]} />
                        } else {
                            return <Popinstep handleLessButton={this.handleLessButton} handlePlusButton={this.handlePlusButton} val={this.state[key]} handleChangeInput={(e) => this.handleChange(e)} key={i} step={this.state.step} name={key} question={this.props.elements[key]} />
                        }
                    }
                })}
                { this.state.step === this.props.autocomplete_step &&
                    <button className={this.state[stepsName] === '' || this.state.beers.indexOf(this.state[stepsName]) === -1  ? 'mainbutton-disabled mt-2' : 'mainbutton mt-2'} onClick={this.handleNextStep}>Suivant</button>
                }
                { this.state.step !== stepsNumber && this.state.step !== this.props.autocomplete_step &&
                    <button className={this.state[stepsName] === '' ? 'mainbutton-disabled mt-2' : 'mainbutton mt-2'} onClick={this.handleNextStep}>Suivant</button>
                }
                { this.state.step === stepsNumber && this.state.step !== this.props.autocomplete_step &&
                    <button className={this.state[stepsName] === '' ? 'mainbutton-disabled mt-2' : 'mainbutton mt-2'}>Valider</button>
                }
                { this.state.step !== 1 &&
                    <p className='cpointer' onClick={this.handlePrevisousStep}>retour</p>
                }
            </div>
        );
    }
}

export default Popin;