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
                <button className={emptyInputsCounter === 0 ? 'mainbutton' : 'mainbutton-disabled'}>
                    {this.props.buttonText}
                </button>
            </div>
        );
    }
}

export default Form;