import React, { Component } from 'react'

class Key extends Component {
    render() {
        
        return (
            <button className={this.props.style} onClick={this.props.onClick}>
                {this.props.keyValue}
            </button>
        )
    }
}

export default Key;
