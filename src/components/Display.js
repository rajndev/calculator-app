import React, { Component } from 'react'

class Display extends Component {
    render() {
        return (
            <div className="display">
                <textarea className="textarea" value={this.props.dispValue} rows={5} cols={5} /> 
            </div>
        )
    }
}

export default Display;
