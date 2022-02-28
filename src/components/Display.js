import React, { Component } from 'react'

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.preventDefault();

        let enteredValue = event.target.value;

        this.setState({ value: enteredValue });

        this.props.onInputChange(enteredValue);

        // console.log(this.state.value);
    }

    render() {
        return (
            <div className="display">
                <div className='result'>
                    {this.props.result}
                </div>
                <div className='ff'>
                    <input type="text" className="user-inputs" ref={this.props.inputRef} onChange={this.props.onInputChange} />
                </div>
            </div>
        )
    }
}

export default Display;