import React, { Component } from 'react'
import Display from './Display'
import Keypad from './Keypad'
import * as math from 'mathjs'

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //  displayValue: "",
            runningValue: "",
            calcResult: 0
        };
        this.inputFieldRef = React.createRef(null);
    }

    handleKeyClick(i) {
        //this.setState({runningValue: this.state.runningValue.concat(i)});
        // console.log(this.state.runningValue);
    }

    setInputRef(inputFieldRef) {
        this.setState({ inputRef: inputFieldRef.current });
    }

    handleInputChange(event) {
        /* let inputText = event.target.value;
         let cursorPosition = event.target.selectionStart
         let textBeforeCursorPosition = event.target.value.substring(0, cursorPosition)
         let textAfterCursorPosition = event.target.value.substring(cursorPosition, event.target.value.length)
         this.setState({ runningValue: textBeforeCursorPosition + inputText + textAfterCursorPosition })

         console.log(this.state.runningValue);*/

        // console.log(this.inputFieldRef.current.value)

        //note to self: setState is asynchronous
        this.setState({ runningValue: this.inputFieldRef.current.value });
    }

    handleEqualsClick() {
        let result = 0;
        let running = this.state.runningValue;

        try {
            result = math.evaluate(running);
            this.setState({ calcResult: result });
        }
        catch {
            return;
        }
    }

    handleClearClick() {
        this.setState({ runningValue: "" });
    }

    handleBackClick() {
        let sliced = this.state.runningValue.slice(0, -1);
        this.setState({ runningValue: sliced });
    }

    render() {
        // console.log(this.state.runningValue);
        return (
            <div className="container">
                <Display result={this.state.calcResult} inputRef={this.inputFieldRef} onInputChange={(event) => this.handleInputChange(event)} />
                <Keypad onKeyClick={i => this.handleKeyClick(i)}
                    onEqualsKeyClick={() => this.handleEqualsClick()}
                    onClearKeyClick={() => this.handleClearClick()}
                    onBackKeyClick={() => this.handleBackClick()} />
            </div>
        )
    }
}

export default Calculator;