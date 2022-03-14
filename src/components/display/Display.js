import React, { Component } from 'react'
import $ from "jquery"
import './display.css';

class Display extends Component {
    constructor(props){
        super(props)
       this.textareaRef = React.createRef(null);
    }
    
    componentDidMount () {
        this.props.getRef(this.textareaRef);
        $("#user-inputs").on( "keypress cut copy paste", function(e) {
            console.log(e.which);
            if(e.which >= 48 && e.which <= 57 
                || e.which === 13 
                || e.which === 46 
                || e.which === 47 
                || e.which === 42 
                || e.which === 43 
                || e.which === 45 
                || e.which === 40 
                || e.which === 41){
                return true;
            }
            else{
                e.preventDefault();
                return false;
            }
        });

      this.textareaRef.current.setSelectionRange(0, 0);
      this.textareaRef.current.blur();
      this.textareaRef.current.focus();
      this.textareaRef.current.setSelectionRange(0, 0);
    }

    render() {
        return (
            <div className="display">
                <div>
                    <textarea 
                    type="text" 
                    id="user-inputs" 
                    className="user-inputs" 
                    value={this.props.value} 
                    ref={this.textareaRef}
                    onChange={this.props.onChange}
                    onSelect={this.props.onSelect}/>
                </div>
            </div>
        )
    }
}

export default Display;