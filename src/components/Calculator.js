import React, { Component } from 'react'
import Display from './Display'
import Keypad from './Keypad'
import * as math from 'mathjs'

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runningValue: "",
            calcResult: 0,
            event: ""
        };
        this.inputFieldRef = React.createRef(null);
    }

    handleKeyClick(i) {
        let cursorPosition = this.state.event.target.selectionStart
        let textBeforeCursorPosition = this.state.event.target.value.substring(0, cursorPosition)
        let textAfterCursorPosition = this.state.event.target.value.substring(cursorPosition, this.state.event.target.value.length)
        this.setState({ runningValue: textBeforeCursorPosition + i + textAfterCursorPosition });
    }

    setInputRef(inputFieldRef) {
        this.setState({ inputRef: inputFieldRef.current });
    }

    handleInputChange(event) {
        //note to self: setState is asynchronous
        this.setState({ event: event })
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
        return (
            <div className="container">
                <Display result={this.state.calcResult} value={this.state.runningValue} inputRef={this.inputFieldRef} onInputChange={(event) => this.handleInputChange(event)} />
                <Keypad onKeyClick={i => this.handleKeyClick(i)}
                    onEqualsKeyClick={() => this.handleEqualsClick()}
                    onClearKeyClick={() => this.handleClearClick()}
                    onBackKeyClick={() => this.handleBackClick()} />
            </div>
        )
    }
}

export default Calculator;