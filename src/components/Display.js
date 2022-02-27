import React, { Component } from 'react'

class Display extends Component {


    
    render() {
        return (
/*             <div className="display">
                <textarea className="textarea" value={this.props.dispValue} rows={5} cols={5} /> 
            </div> */
            
                /*             <div className="display">
                                <textarea className="textarea" value={this.props.dispValue} rows={5} cols={5} />
                            </div> */
                            

            <div className="display">
                <div className='ff'>
                {this.props.dispValue || 0}
                </div>
            </div>
        )
    }
}

export default Display;
