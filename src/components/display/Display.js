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
        $(".user-inputs").on( "keypress cut copy paste", function(event) {
            const KeyboardKeys = {
                NUMPAD_ZERO_KEY: 48,
                NUMPAD_NINE_KEY: 57,
                NUMPAD_DOT_KEY: 46,
                NUMPAD_PLUS_KEY: 43,
                NUMPAD_MINUS_KEY: 45,
                NUMPAD_MULTIPLY_KEY: 42,
                NUMPAD_DIVIDE_KEY: 47,
             };
             Object.freeze(KeyboardKeys);
            if(event.which >= KeyboardKeys.NUMPAD_ZERO_KEY && event.which <= KeyboardKeys.NUMPAD_NINE_KEY
                || event.which === KeyboardKeys.NUMPAD_DOT_KEY 
                || event.which === KeyboardKeys.NUMPAD_PLUS_KEY 
                || event.which === KeyboardKeys.NUMPAD_MINUS_KEY 
                || event.which === KeyboardKeys.NUMPAD_MULTIPLY_KEY 
                || event.which === KeyboardKeys.NUMPAD_DIVIDE_KEY ){
                return true;
            }
            else{
                event.preventDefault();
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
                    id="textarea-scroll"
                    className="user-inputs" 
                    value={this.props.value} 
                    ref={this.textareaRef}
                    onChange={this.props.onChange}
                    onSelect={this.props.onSelect}
                    maxLength="50"/>
                </div>
                <div className="counter">
                    {this.props.counter}/50
                </div>
            </div>
        )
    }
}

export default Display;