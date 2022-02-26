import React, { Component } from 'react'

class Display extends Component {
    render() {
        return (
            <div className="display">
                    <input type="text" value={this.props.dispValue} /> 
            </div>
        )
    }
}

export default Display;
