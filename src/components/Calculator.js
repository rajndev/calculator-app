import React, { Component } from 'react'
import Display from './Display'
import Keypad from './Keypad'
import * as math from 'mathjs'

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runningValue: "",
            cursorPos: {start: 0, end: 0},
        };
        this.inputRef = React.createRef(null);
        this.calcResult = 0;
        this.event = "";
        this.selected = false;
    }

    handleKeyClick = (key) => {
        if(this.state.runningValue === "" || (this.state.runningValue.length >= 1 && !this.state.selected)){
            this.setState(prevState => ({
                runningValue: prevState.runningValue.concat(key)
            }));
        }
        else {
            let cursorPosition = this.state.cursorPos.start;
            let textBeforeCursorPosition = this.state.runningValue.substring(0, cursorPosition);
            let textAfterCursorPosition = this.state.runningValue.substring(cursorPosition, this.state.runningValue.length);
            let updatedText = textBeforeCursorPosition + key + textAfterCursorPosition;
            this.setState(prevState => ({
                runningValue: updatedText
            }));
            this.setState(prevState => ({
                cursorPos: {
                  start: prevState.cursorPos.start + 1,
                  end: prevState.cursorPos.end + 1
                }
              }));
        }
    }

    handleInputChange = () => {
        //note to self: setState is asynchronous
        this.setState({
            runningValue: this.inputRef.current.value
        });
    }

    handleSelect = (event) => {
        this.setState({
            cursorPos: {
              start: event.target.selectionStart,
              end: event.target.selectionEnd
            }
          });

          this.setState({selected: true});
    }

    handleEqualsClick = () => {
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

    handleClearClick = () => {
        this.setState({ runningValue: "" });
    }

    handleBackClick = () => {
        let sliced = this.state.runningValue.slice(0, -1);
        this.setState({ runningValue: sliced });
    }

    render() {
        return (
            <div className="container">
                <Display result={this.state.calcResult}
                inputRef={this.inputRef}
                value={this.state.runningValue} 
                onInputChange={() => this.handleInputChange()} 
                onSelect={(event => this.handleSelect(event))}/>

                <Keypad onKeyClick={i => this.handleKeyClick(i)}
                    onEqualsKeyClick={() => this.handleEqualsClick()}
                    onClearKeyClick={() => this.handleClearClick()}
                    onBackKeyClick={() => this.handleBackClick()} />
            </div>
        )
    }
}

export default Calculator;