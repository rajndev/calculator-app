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

    setInputRef(inputRef) {
        this.setState({ inputRef: inputRef.current });
    }

    handleInputChange() {
        console.log(this.inputFieldRef.current.value)
        // let homer = this.textInput.value;
        // this.setState({ runningValue: homer });
        //console.log(this.state.runningValue);
    }

    handleEqualsClick() {
        let result = 0;
        let running = this.state.runningValue;

        try {
            result = math.evaluate(running);
            this.setState({ calcResult: result });
            // console.log(calcResult);
            //this.setState({result: result});
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
                <Display result={this.state.calcResult} inputRef={this.inputFieldRef} onInputChange={() => this.handleInputChange()} />
                <Keypad onKeyClick={i => this.handleKeyClick(i)}
                    onEqualsKeyClick={() => this.handleEqualsClick()}
                    onClearKeyClick={() => this.handleClearClick()}
                    onBackKeyClick={() => this.handleBackClick()} />
            </div>
        )
    }
}

export default Calculator;