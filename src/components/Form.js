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

    handleSubmit = (e, url, inputs) => {
        e.target.classList.remove('mainbutton');
        e.target.classList.add('mainbutton-disabled');
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
            this.props.inputs.map((item) => {
                this.setState({
                    [item]: ''
                });
            })
            e.target.classList.add('mainbutton');
            e.target.classList.remove('mainbutton-disabled');
            if (data.status === 'failed') {
                this.setState({ errorMessage: data.message })
            } else {
                this.props.handleSubmission(data.token)
                this.setState({ errorMessage: '' })
            }
        })
    }

    render() {
        let errorsFormCounter = 0;
        this.props.inputs.map((item) => {
            if (this.state[item] === '') {
                errorsFormCounter += 1;
            }
            if (item === 'email') {
                if (!/^\S+@\S+\.\S+$/.test(this.state[item])) {
                    errorsFormCounter += 1;
                }
            }
        })
        
        return (
            <div className='formstructure'>
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
                <button className={errorsFormCounter === 0 ? 'mainbutton mt-2' : 'mainbutton-disabled mt-2'} onClick={(e) => this.handleSubmit(e, this.props.url, this.state)}>
                    {this.props.buttonText}
                </button>
            </div>
        );
    }
}

export default Form;