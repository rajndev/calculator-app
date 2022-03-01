import React, { Component } from 'react'

class Display extends Component {
    render() {
        return (
            <div className="display">
                <div className='result'>
                    {this.props.result}
                </div>
                <div className='ff'>
                    <input type="text" className="user-inputs" value={this.props.value} ref={this.props.inputRef} onChange={this.props.onInputChange} onSelect={this.props.onSelect} />
                </div>
            </div>
        )
    }
}

export default Display;