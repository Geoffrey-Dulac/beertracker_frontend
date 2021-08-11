import React from 'react';

class Form extends React.Component {
    constructor(props) {
        super(props);
        let objectInputs = {};
        this.props.inputs.map((item) => {
            objectInputs[item] = '';
        })
        this.state = objectInputs;
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e, url, inputs) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...inputs
            }) 
        })
        .then(resp => resp.json())
        .then(data => {
            this.props.handleLogin(data.user)
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
            <div className='formstructure w-100 px-5 py-3'>
                {this.props.inputs.map((item) =>
                    item === 'password'
                        ? <input value={this.state[item]} onChange={this.handleChange} placeholder={item} name={item} className={this.props.classes} key={item} type={item}/>
                        : <input value={this.state[item]} onChange={this.handleChange} placeholder={item} name={item} className={this.props.classes} key={item} />
                )}
                <button className={emptyInputsCounter === 0 ? 'mainbutton' : 'mainbutton-disabled'} onClick={() => handleSubmit(e, this.props.url, this.props.inputs)}>
                    {this.props.buttonText}
                </button>
            </div>
        );
    }
}

export default Form;