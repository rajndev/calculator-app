import React, { Component } from 'react'
import Display from '../display/Display'
import Keypad from '../keypad/Keypad'
import * as math from 'mathjs'
import './calculator.css';
import ParenthesesProcessor from './ParenthesesProcessor';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runningValue: "",
            cursorPos: {start: 0, end: 0},
        };
        this.textareaRef = React.createRef(null);
    }

    handleKeyClick = (key) => {
        if (key === "()") {
            key = ParenthesesProcessor.getNextParentheses(this);
        }

        //if the cursor is currently at the end of the running display value
        if (this.state.cursorPos.start === this.state.runningValue.length + 1 || this.state.runningValue === "") {
            this.setState(prevState => ({
                runningValue: prevState.runningValue.concat(key),
                cursorPos:{
                    start: prevState.cursorPos.start + 1,
                    end: prevState.cursorPos.end + 1
                    },
            }), () => {
                this.setInputSelectionRange(this.state.cursorPos.start, this.state.cursorPos.start);
            });

            //scroll up the text in the display when it reaches the bottom of the textarea
            if (this.textareaRef != null) {
                this.textareaRef.current.scrollTop = this.textareaRef.current.scrollHeight;
            }
        } else {
            let selectedText = this.state.runningValue.substring(this.textareaRef.current.selectionStart, this.textareaRef.current.selectionEnd);
            this.insertTextIntoDisplay(key, selectedText);
        }
    }

    //the backspace key on the keyboard is pressed
    handleInputChange = () => {
        this.setState({runningValue: this.textareaRef.current.value});
    }

    handleSelect = (event) => {
        if (this.state.runningValue === "") {
          this.setState({
            cursorPos: {
              start: 0,
              end: 0
            },
          });
          this.setInputSelectionRange(0, 0);
        } else {
            this.setState({
                cursorPos: {
                  start: event.target.selectionStart,
                  end: event.target.selectionEnd
                }
              }, () => {
                this.setInputSelectionRange(this.state.cursorPos.start, this.state.cursorPos.end);
              });
        }
    }

    handleEqualsClick = () => {
        let result = 0;

        try {
            if (this.state.runningValue.includes("/0")) {
                alert("Cannot divide by 0! Please check your input.");
                return;
            } else {
                //calculate the math expression in the display
                result = math.evaluate(this.state.runningValue);
                this.setState({runningValue: result.toString()});
                let newCursorPos = result.toString().length;
                this.setState({
                    cursorPos: {
                    start: newCursorPos,
                    end: newCursorPos
                    },
                }, () => {
                    this.setInputSelectionRange(newCursorPos, newCursorPos);
                });
            }
        } catch {
            alert("Invalid calculation!");
            return;
        }
    }

    handleClearClick = () => {
        this.setState({ 
            runningValue: "",
            cursorPos: {start: 0, end: 0},
        });
        this.setInputSelectionRange(0, 0);
    }

    handleBackClick = () => {
        let selectedText = this.state.runningValue.substring(this.textareaRef.current.selectionStart, this.textareaRef.current.selectionEnd);

        if (this.state.runningValue === "" || this.state.cursorPos.start === 0) {
            this.setInputSelectionRange(0, 0);
            return;
        } else if (selectedText || selectedText === "") {
            this.deleteTextFromDisplay(selectedText);
        } else { //default trailing deletion behavior
            let sliced = this.state.runningValue.slice(0, -1);
            this.setState({ runningValue: sliced });
        }
    }

    insertTextIntoDisplay = (key, selectedText) => {
        let cursorStartPos = this.state.cursorPos.start;
        let cursorEndPos = this.state.cursorPos.end;
        let textBeforeCursorStart = this.state.runningValue.substring(0, cursorStartPos);
        let textAfterCursorEnd = this.state.runningValue.substring(cursorEndPos, this.state.runningValue.length);
        let allSelected = selectedText === this.state.runningValue;
        let updatedText;

        if (key === "(" || key === ")") {
            key = ParenthesesProcessor.getNextParentheses(this);
        }

        //if the entire input is selected
        if(allSelected){
            updatedText = key;
        } else {
            updatedText = textBeforeCursorStart + key + textAfterCursorEnd;
        }

        this.setState({
            runningValue: updatedText
        });
        
        this.setState(prevState => {
            if (selectedText !== "") {
                if (allSelected) {
                    return {cursorPos:{
                        start: 1,
                        end: 1
                        },
                    }
                } else {
                     return {cursorPos:{
                        start: cursorStartPos + 1,
                        end: cursorEndPos + 1
                        },
                    }
                }
               
            } else if (selectedText === "") {
                return {cursorPos:{
                    start: prevState.cursorPos.start + 1,
                    end: prevState.cursorPos.end + 1
                    },
                }
            }
        }, () => {
            this.setInputSelectionRange(this.state.cursorPos.start, this.state.cursorPos.start);
        });
    }

    deleteTextFromDisplay = (selectedText) => {
        let cursorStartPos = this.textareaRef.current.selectionStart;
        let cursorEndPos = this.textareaRef.current.selectionEnd;
        let textBeforeCursorStart = this.state.runningValue.substring(0, cursorStartPos);
        let textAfterCursorEnd = this.state.runningValue.substring(cursorEndPos, this.state.runningValue.length);
        let updatedText =  selectedText ? textBeforeCursorStart + textAfterCursorEnd : textBeforeCursorStart.slice(0, -1) + textAfterCursorEnd;

        //if a selection was made or display was clicked
        if (updatedText) {
            this.setState({runningValue: updatedText});
            if (selectedText) {
                this.setState({
                    cursorPos: { start: cursorStartPos, end: cursorEndPos }}, () => {
                    this.setInputSelectionRange(this.state.cursorPos.start, this.state.cursorPos.start);
                });
            } else {
                this.setState(prevState => {
                    return { cursorPos: { start: prevState.cursorPos.start - 1, end: prevState.cursorPos.end - 1}};
                },  () => {
                    this.setInputSelectionRange(this.state.cursorPos.start, this.state.cursorPos.start);
                });
            }
        } else { //else reset the display since the entire expression was selected
            this.setState({runningValue: "", cursorPos: {start: 0, end: 0}});
            this.setInputSelectionRange(0, 0);  
        }
    }

    setInputSelectionRange = (selectionStart, selectionEnd) => {
        this.textareaRef.current.setSelectionRange(selectionStart, selectionEnd);
        this.textareaRef.current.blur();
        this.textareaRef.current.focus();
        this.textareaRef.current.setSelectionRange(selectionStart, selectionEnd);
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