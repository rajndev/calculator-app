import React, { Component } from 'react'

class Display extends Component {
    render() {
        return (
            <div className="display">
                <div className='ff'>
                {this.props.dispValue || 0}
                </div>
            </div>
        )
    }
}

export default Display;
