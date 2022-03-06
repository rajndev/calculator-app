import React, { Component } from 'react'
import './key.css'

class Key extends Component {
    render() {
        return (
            <button className={this.props.styleProp} onClick={this.props.onClick}>
                {this.props.keyValue}
            </button>
        )
    }
}

export default Key;
