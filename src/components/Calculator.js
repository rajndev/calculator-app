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

            if(key === "()"){
                if(runningValueIsEmpty){
                    key = "(";
                    this.setState({ parentheses: "(" });
                }
                else{
                    key = this.getNextParentheses();
                }
                this.setState(prevState => {
                    return {parenthesesCount: prevState.parenthesesCount + 1}
                });
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
            let cursorPosition = this.state.cursorPos.start;
            let textBeforeCursorPosition = this.state.runningValue.substring(0, cursorPosition);
            let textAfterCursorPosition = this.state.runningValue.substring(cursorPosition, this.state.runningValue.length);

            //prevent next parentheses mismatch
            let trailingChar = textBeforeCursorPosition[textBeforeCursorPosition.length - 1];
            if(trailingChar === "(" || trailingChar === ")"){
                if(trailingChar === "("){
                    this.setState({parentheses: "("});
                    this.setState({parenthesesDeleted: true});
                }
                else if(trailingChar === ")"){
                    this.setState({parentheses: ")"});
                    this.setState({parenthesesDeleted: true});
                }
                this.setState(prevState => {
                    if(this.state.parenthesesCount !== 0){
                        return {parenthesesCount: prevState.parenthesesCount - 1}
                    }
                });
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
                this.textareaRef.current.setSelectionRange(this.state.cursorPos.start, this.state.cursorPos.end);
                this.textareaRef.current.blur();
                this.textareaRef.current.focus();
                this.textareaRef.current.setSelectionRange(this.state.cursorPos.start, this.state.cursorPos.end);
            });
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
                alert("Invalid calculation!");
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
            parentheses: "", 
            selected: false,
            cursorPos: {start: 0, end: 0}
        });
        this.textareaRef.current.focus();
    }

    handleBackClick = () => {
        if(this.state.selected && this.state.cursorPos.start === 0){
            return;
        }
        else if(this.state.selected){
            let cursorPosition = this.state.cursorPos.start;
            let textBeforeCursorPosition = this.state.runningValue.substring(0, cursorPosition);
            let textAfterCursorPosition = this.state.runningValue.substring(cursorPosition, this.state.runningValue.length);

            //prevent next parentheses mismatch
            let trailingChar = textBeforeCursorPosition[textBeforeCursorPosition.length - 1];
            if(trailingChar === "(" || trailingChar === ")"){
                if(trailingChar === "("){
                    this.setState({parentheses: "("});
                    this.setState({parenthesesDeleted: true});
                }
                else if(trailingChar === ")"){
                    this.setState({parentheses: ")"});
                    this.setState({parenthesesDeleted: true});
                }
                this.setState(prevState => {
                    if(this.state.parenthesesCount !== 0){
                        return {parenthesesCount: prevState.parenthesesCount - 1}
                    }
                });
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
                this.textareaRef.current.setSelectionRange(this.state.cursorPos.start, this.state.cursorPos.end);
                this.textareaRef.current.blur();
                this.textareaRef.current.focus();
                this.textareaRef.current.setSelectionRange(this.state.cursorPos.start, this.state.cursorPos.end);
            });

            this.setState({selected: false});
            }   
            else{
                //prevent next parentheses mismatch
                let trailingChar = this.state.runningValue[this.state.runningValue.length - 1];
                if(trailingChar === "(" || trailingChar === ")"){
                if(trailingChar === "("){
                    this.setState({parentheses: "("});
                    this.setState({parenthesesDeleted: true});
                }
                else if(trailingChar === ")"){
                    this.setState({parentheses: ")"});
                    this.setState({parenthesesDeleted: true});
                }
                this.setState(prevState => {
                    if(this.state.parenthesesCount !== 0){
                        return {parenthesesCount: prevState.parenthesesCount - 1}
                    }
                });
            }

                let sliced = this.state.runningValue.slice(0, -1);
                this.setState({ runningValue: sliced });
            }
    }

    getNextParentheses = () => {
        //If a parentheses was just deleted, prevent mismatch on next parentheses value
        if(this.state.parentheses === "(" && this.state.parenthesesDeleted){
            this.setState({parentheses: "("});
            this.setState({parenthesesDeleted: false});
            return "(";
        }
        else if(this.state.parentheses === ")" && this.state.parenthesesDeleted){
            this.setState({parentheses: ")"});
            this.setState({parenthesesDeleted: false});
            return ")";
        }
        else{
            //default logic for assigning next parentheses
            if(this.state.parenthesesCount === 0){
                return "(";
            }
            if(this.state.parentheses === "("){
                this.setState({parentheses: ")"});
                return ")";
            }
            else{
                this.setState({parentheses: "("});
                return "(";
            }
        }
    }

    getTextareaRef = (ref) => {
        this.textareaRef = ref;
    }

    render() {
        return (
            <div className="container">
                <Display 
                    value={this.state.runningValue} 
                    onChange={() => this.handleInputChange()} 
                    onSelect={(event) => this.handleSelect(event)}
                    getRef={(ref) => this.getTextareaRef(ref)}/>

                <Keypad onKeyClick={i => this.handleKeyClick(i)}
                    onEqualsKeyClick={() => this.handleEqualsClick()}
                    onClearKeyClick={() => this.handleClearClick()}
                    onBackKeyClick={() => this.handleBackClick()} />
            </div>
        )
    }
}

export default Calculator;