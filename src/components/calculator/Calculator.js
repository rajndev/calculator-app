import React, { Component } from 'react'
import ParenthesesProcessor from './parentheses'
import Display from '../display/Display'
import Keypad from '../keypad/Keypad'
import * as math from 'mathjs'
import './calculator.css';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runningValue: "",
            cursorPos: {start: 0, end: 0},
            selected: false,
            parentheses: "(",
            parenthesesCount: 0,
            parenthesesDeleted: false
        };

        this.textareaRef = React.createRef(null);
    }

    handleKeyClick = (key) => {
        let runningValueIsEmpty = this.state.runningValue.length === 0;
        let selectedStateIsFalse = this.state.selected === false;
            
            if(key == "()"){
                key = ParenthesesProcessor.handleParenthesesClick(this);
            }

            //prevent use of modulus key if display is empty
            if(key === "%" && runningValueIsEmpty){
                return;
            }

        if(runningValueIsEmpty || !runningValueIsEmpty && selectedStateIsFalse){
                this.setState(prevState => ({
                    runningValue: prevState.runningValue.concat(key)
                }));

                if(this.textareaRef != null){
                    this.textareaRef.current.scrollTop = this.textareaRef.current.scrollHeight;
                  }
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
                }), () => {
                    this.textareaRef.current.setSelectionRange(this.state.cursorPos.start, this.state.cursorPos.end);
                    this.textareaRef.current.blur();
                    this.textareaRef.current.focus();
                    this.textareaRef.current.setSelectionRange(this.state.cursorPos.start, this.state.cursorPos.end);
                });
            }
    }

    handleInputChange = () => {
        if(this.state.selected){
            this.updateRunningValueWithBackKey();
        }
        else{
            this.setState({runningValue: this.textareaRef.current.value});
        }
    }

    handleSelect = (event) => {
        if(this.state.runningValue === ""){
          this.setState({selected: false});
          this.setState({
            cursorPos: {
              start: 0,
              end: 0
            }
          });
        }
        else{
            this.setState({
                cursorPos: {
                  start: event.target.selectionStart,
                  end: event.target.selectionEnd
                }
              });
            this.setState({selected: true});
        }
    }

    handleEqualsClick = () => {
        let result = 0;
        let running = this.state.runningValue;

        try {
            if(this.state.runningValue.includes("/0")){
                alert("Cannot divide by 0! Please check your input.");
                return;
            }
            else{
                result = math.evaluate(running);
                this.setState({ runningValue: result.toString() });
                this.setState({ selected: false });
                let newCursorPos = this.state.runningValue.length - 1;
                this.setState({
                    cursorPos: {
                    start: newCursorPos,
                    end: newCursorPos
                    }
                });
                this.textareaRef.current.focus();
            }
        }
        catch {
            alert("Invalid calculation!");
            return;
        }
    }

    handleClearClick = () => {
        this.setState({ 
            runningValue: "", 
            parentheses: "(",
            parenthesesCount: 0,
            parenthesesDeleted: false, 
            selected: false,
            cursorPos: {start: 0, end: 0}
        });
        this.textareaRef.current.focus();
    }

    handleBackClick = () => {
        if(this.state.selected && this.state.cursorPos.start === 0){
            this.setState({ 
                runningValue: "", 
                parentheses: "(",
                parenthesesCount: 0,
                parenthesesDeleted: false, 
                selected: false,
                cursorPos: {start: 0, end: 0}
            });
            return;
        }
        else if(this.state.selected){
            this.updateRunningValueWithBackKey();
            }   
            else{
                //prevent next parentheses mismatch
                let trailingChar = this.state.runningValue[this.state.runningValue.length - 1];
                if(trailingChar === "(" || trailingChar === ")"){
                    ParenthesesProcessor.updateParenthesesState(trailingChar, this);
                }

                let sliced = this.state.runningValue.slice(0, -1);
                this.setState({ runningValue: sliced });
            }
    }

    getTextareaRef = (ref) => {
        this.textareaRef = ref;
    }

    updateRunningValueWithBackKey = () => {
        let cursorPosition = this.state.cursorPos.start;
        let textBeforeCursorPosition = this.state.runningValue.substring(0, cursorPosition);
        let textAfterCursorPosition = this.state.runningValue.substring(cursorPosition, this.state.runningValue.length);

        let trailingChar = textBeforeCursorPosition[textBeforeCursorPosition.length - 1];
        
        //prevent next parentheses mismatch
        if(trailingChar === "(" || trailingChar === ")"){
            ParenthesesProcessor.updateParenthesesState(trailingChar, this);
        }

        let sliced = textBeforeCursorPosition.slice(0, -1);
        let updatedText = sliced + textAfterCursorPosition;

        this.setState(prevState => ({
            runningValue: updatedText
        }));

        this.setState(prevState => ({
            cursorPos: {
            start: prevState.cursorPos.start - 1,
            end: prevState.cursorPos.end - 1
            }
        }), () => {
            //scroll to the current position of the cursor
            this.textareaRef.current.setSelectionRange(this.state.cursorPos.start, this.state.cursorPos.end);
            this.textareaRef.current.blur();
            this.textareaRef.current.focus();
            this.textareaRef.current.setSelectionRange(this.state.cursorPos.start, this.state.cursorPos.end);
        });

        //this.setState({selected: false});
    }

    render() {
        return (
            <div className="container">
                <Display 
                    value={this.state.runningValue} 
                    onChange={() => this.handleInputChange()} 
                    onSelect={(event) => this.handleSelect(event)}
                    getRef={(ref) => this.getTextareaRef(ref)}/>

                <Keypad 
                    onKeyClick={i => this.handleKeyClick(i)}
                    onEqualsKeyClick={() => this.handleEqualsClick()}
                    onClearKeyClick={() => this.handleClearClick()}
                    onBackKeyClick={() => this.handleBackClick()} />
            </div>
        )
    }
}

export default Calculator;