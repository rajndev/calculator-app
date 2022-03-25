import React, { Component } from 'react'
import Display from '../display/Display'
import Keypad from '../keypad/Keypad'
import * as math from 'mathjs'
import './calculator.css';
import ParenthesesProcessor from './ParenthesesProcessor';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runningValue: "",
            cursorPosition: {start: 0, end: 0},
            isDivideByZeroModalOpen: false,
            isInvalidInputModalOpen: false,
        };
        this.textareaRef = React.createRef(null);
        this.counter = 50;
    }

    handleKeyClick = (key) => {

        if(this.counter <= 0){
            return;
        }

        if (key === "()") {
            key = ParenthesesProcessor.getNextParenthesis(this);
        }

        let cursorIsAtEnd = this.state.cursorPosition.start === this.state.runningValue.length + 1;
        if (this.state.runningValue === "" || cursorIsAtEnd) {

            this.setState(prevState => ({
                runningValue: prevState.runningValue.concat(key),
                cursorPosition:{
                    start: prevState.cursorPosition.start + 1,
                    end: prevState.cursorPosition.end + 1
                    },
                }), () => {
                    this.setInputSelectionRange(this.state.cursorPosition.start, this.state.cursorPosition.start);
                    this.counter = 50 - this.state.runningValue.length;
                }
            );

            //scroll up the text in the display when it reaches the bottom of the textarea
            if (this.textareaRef != null) {
                this.textareaRef.current.scrollTop = this.textareaRef.current.scrollHeight;
            }

            return;
        }
            this.insertTextIntoDisplay(key);
    }

    insertTextIntoDisplay = (key) => {
        let cursorStartPosition = this.textareaRef.current.selectionStart;
        let cursorEndPosition = this.textareaRef.current.selectionEnd;
        let textBeforeCursorStart = this.state.runningValue.substring(0, cursorStartPosition);
        let textAfterCursorEnd = this.state.runningValue.substring(cursorEndPosition, this.state.runningValue.length);

        if (key === "(" || key === ")") {
            key = ParenthesesProcessor.getNextParenthesis(this);
        }

        let updatedText = textBeforeCursorStart + key + textAfterCursorEnd;

        this.setState({
            runningValue: updatedText,
            cursorPosition: { start: cursorStartPosition + 1, end: cursorEndPosition + 1}
        }, () => {
            this.setInputSelectionRange(this.state.cursorPosition.start, this.state.cursorPosition.start);
            this.counter = 50 - this.state.runningValue.length;
        });
    }

    handleInputChange = () => {
        this.setState({runningValue: this.textareaRef.current.value}, () => {
            this.counter = 50 - this.state.runningValue.length;
        });
    }

    handleSelect = (event) => {
        if (this.state.runningValue === "") {
          this.setState({
            cursorPosition: {
              start: 0,
              end: 0
            },
          });
          this.setInputSelectionRange(0, 0);
          return;
        } 
        
        this.setState({
            cursorPosition: {
              start: event.target.selectionStart,
              end: event.target.selectionEnd
            }
            }, () => {
                this.setInputSelectionRange(this.state.cursorPosition.start, this.state.cursorPosition.end);
            }
        );
    }

    handleEqualsClick = () => {
        let result = 0;

        try {
            if (this.state.runningValue.includes("/0")) {
                this.showModal("zero");
                return;
            }

            result = math.evaluate(this.state.runningValue);
            this.setState({runningValue: result.toString()}, () => {
                let charsLeft = 50 - this.state.runningValue.length;
                this.counter =  charsLeft < 0 ? 0 : charsLeft;
            });
            let newCursorPosition = result.toString().length;
            this.setState({
                cursorPosition: {
                start: newCursorPosition,
                end: newCursorPosition
                },
            }, () => {
                this.setInputSelectionRange(newCursorPosition, newCursorPosition);
            });
            
        } catch {
            this.showModal("invalid");
            return;
        }
    }

    handleClearClick = () => {
        this.setState({ 
            runningValue: "",
            cursorPosition: {start: 0, end: 0},
        });
        this.setInputSelectionRange(0, 0);
        this.counter = 50;
    }

    handleBackClick = () => {
        let cursorIsAtBeginning = this.textareaRef.current.selectionStart === 0 && this.textareaRef.current.selectionEnd === 0; 
        if (this.state.runningValue === "" || cursorIsAtBeginning) {
            this.setInputSelectionRange(0, 0);
            this.counter = 50;
            return;
        }
        let selectedText = this.state.runningValue.substring(this.textareaRef.current.selectionStart, this.textareaRef.current.selectionEnd);
        this.deleteTextFromDisplay(selectedText);
    }

    deleteTextFromDisplay = (selectedText) => {
        let cursorStartPosition = this.textareaRef.current.selectionStart;
        let cursorEndPosition = this.textareaRef.current.selectionEnd;
        let textBeforeCursorStart = this.state.runningValue.substring(0, cursorStartPosition);
        let textAfterCursorEnd = this.state.runningValue.substring(cursorEndPosition, this.state.runningValue.length);
        let updatedText =  selectedText ? textBeforeCursorStart + textAfterCursorEnd : textBeforeCursorStart.slice(0, -1) + textAfterCursorEnd;

        if (updatedText) {
            this.setState({runningValue: updatedText}, () => {
                this.counter = 50 - this.state.runningValue.length;
            });
            if (selectedText) {
                this.setState({
                    cursorPosition: { start: cursorStartPosition, end: cursorEndPosition }}, () => {
                    this.setInputSelectionRange(this.state.cursorPosition.start, this.state.cursorPosition.start);
                });
                return;
            }

            this.setState(prevState => {
                return { cursorPosition: { start: prevState.cursorPosition.start - 1, end: prevState.cursorPosition.end - 1}};
            },  () => {
                this.setInputSelectionRange(this.state.cursorPosition.start, this.state.cursorPosition.start);
            });
            return;
        }

        //else reset the display since the entire expression was selected
        this.setState({runningValue: "", cursorPosition: {start: 0, end: 0}});
        this.setInputSelectionRange(0, 0);
        this.counter = 50;
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

    showModal = (modalType) => {
        if(modalType === "invalid") 
        {
            this.setState({isInvalidInputModalOpen: true})
            return;
         }
            this.setState({isDivideByZeroModalOpen: true});
    }
    
    hideModal = (modalType) => {
        if(modalType === "invalid") 
        {
            this.setState({isInvalidInputModalOpen: false});
            return;
         }
            this.setState({isDivideByZeroModalOpen: false});
    }
    
    render() {
        return (
            <div className="container">
                <Modal show={this.state.isInvalidInputModalOpen} onHide={() => this.hideModal("invalid")}>
                    <Modal.Header closeButton>
                        <Modal.Title>Input Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your mathematical expression is invalid!</Modal.Body>
                </Modal>
                <Modal show={this.state.isDivideByZeroModalOpen} onHide={() => this.hideModal("zero")}>
                    <Modal.Header closeButton>
                        <Modal.Title>Invalid Operation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You can't divide by 0!</Modal.Body>
                </Modal>
                <Display 
                    value={this.state.runningValue} 
                    counter={this.counter}
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