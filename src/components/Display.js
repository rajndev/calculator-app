import React, { Component } from 'react'

class Display extends Component {
    render() {
        return (
            <div className="display">
                <div className='result'>
                    108
                </div>
                <div className='ff'>
                    <input type="text" className="user-inputs" value={this.props.dispValue || 0} />
                </div>
            </div>
        )
    }
}

export default Display;
