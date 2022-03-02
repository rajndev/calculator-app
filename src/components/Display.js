import React, { Component } from 'react'
import $ from "jquery"

class Display extends Component {
    constructor(props){
        super(props)
       this.textareaRef = React.createRef(null);
    }
    
    componentDidMount () {
        this.props.getTextareaRef(this.textareaRef);
        $("#user-inputs").on('keypress', function(event) {
            event.preventDefault();
            return false;
        });
    }

    render() {
        return (
            <div className="display">
                <div>
                    <textarea type="text" id="user-inputs" className="user-inputs" value={this.props.value} ref={this.textareaRef} onChange={() => this.props.onInputChange()} onSelect={this.props.onSelect}/>
                </div>
            </div>
        )
    }
}

export default Display;