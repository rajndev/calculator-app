import React, { Component } from 'react'

class Display extends Component {
    render() {
        return (
            <div className="display">
                <div className='result'>
                    108
                </div>
                <div className='ff'>
                    <input type="text" className="user-inputs"/>
                </div>
            </div>
        )
    }
}

export default Display;
