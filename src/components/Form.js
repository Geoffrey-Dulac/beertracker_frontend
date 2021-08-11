import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        let objectInputs = {};
        this.props.inputs.map((item) => {
            objectInputs[item] = '';
        })
        this.state = objectInputs;
        this.state['errorMessage'] = '';
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (url, inputs) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                inputs
            ) 
        })
        .then((response) => response.json())
        .then(data => { 
            if (data.status === 'failed') {
                this.setState({ errorMessage: data.message })
            } else {
                this.props.handleLogin()
                this.setState({ errorMessage: '' })
            }
        })
        this.props.inputs.map((item) => {
            this.setState({
                [item]: ''
            });
        })
    }

    render() {
        let emptyInputsCounter = 0;
        this.props.inputs.map((item) => {
            if (this.state[item] === '') {
                emptyInputsCounter += 1;
            }
        })
        
        return (
            <div className='formstructure w-100 px-5'>
                <div className='height-18px text-center mb-2'>
                    { this.state.errorMessage !== '' &&
                        <p className='cerror'>{this.state.errorMessage}</p>
                    }
                </div>
                {this.props.inputs.map((item) =>
                    item === 'password'
                        ? <input value={this.state[item]} onChange={this.handleChange} placeholder={item} name={item} className={this.props.classes} key={item} type='password' />
                        : <input value={this.state[item]} onChange={this.handleChange} placeholder={item} name={item} className={this.props.classes} key={item} />
                )}
                <button className={emptyInputsCounter === 0 ? 'mainbutton' : 'mainbutton-disabled'} onClick={() => this.handleSubmit(this.props.url, this.state)}>
                    {this.props.buttonText}
                </button>
            </div>
        );
    }
}

export default Form;