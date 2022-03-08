import React, { Component } from 'react'
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
            selected: false
        };
        this.textareaRef = React.createRef(null);
    }

    handleKeyClick = (key) => {
        let runningValueIsEmpty = this.state.runningValue.length === 0;
        let selectedStateIsFalse = this.state.selected === false;
        let selectedText = this.state.runningValue.substring(this.textareaRef.current.selectionStart, this.textareaRef.current.selectionEnd);

        if(selectedText !== "" || this.state.selected && selectedText === ""){
            this.insertTextIntoDisplay(key);
        }
        else
        {
            if(runningValueIsEmpty || !runningValueIsEmpty && selectedStateIsFalse){

                this.setState(prevState => ({
                    runningValue: prevState.runningValue.concat(key)
                }));
    
                //scroll the textarea up when the input reaches the bottom
                if(this.textareaRef != null){
                    this.textareaRef.current.scrollTop = this.textareaRef.current.scrollHeight;
                }
            }
        }
    }

    //the backspace key on the keyboard is pressed
    handleInputChange = () => {
        this.setState({runningValue: this.textareaRef.current.value});
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
            this.textareaRef.current.setSelectionRange(0, 0);
            this.textareaRef.current.blur();
            this.textareaRef.current.focus();
            this.textareaRef.current.setSelectionRange(0, 0);
        }
        else{
            this.textareaRef.current.focus();
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
                //calculate the math expression on the display
                result = math.evaluate(running);
                this.setState({runningValue: result.toString()});
                this.setState({selected: false});
                let newCursorPos = result.toString().length;
                this.setState({
                    cursorPos: {
                    start: newCursorPos,
                    end: newCursorPos
                    }
                });
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
            selected: false,
            cursorPos: {start: 0, end: 0}
        });
    }

    handleBackClick = () => {
        let selectedText = this.state.runningValue.substring(this.textareaRef.current.selectionStart, this.textareaRef.current.selectionEnd);
       
        if(this.state.runningValue === ""){
            return;
        } //if a text selection exists or no selection exists while the textarea is selected
        else if(selectedText !== "" || this.state.selected && selectedText === ""){
            this.deleteTextFromDisplay(selectedText);
        }
        else
        {//default trailing delete behavior
            let sliced = this.state.runningValue.slice(0, -1);
            this.setState({ runningValue: sliced });
        }
    }

    getTextareaRef = (ref) => {
        this.textareaRef = ref;
    }

    insertTextIntoDisplay = (key) => {
        let selectedText = this.state.runningValue.substring(this.textareaRef.current.selectionStart, this.textareaRef.current.selectionEnd);

        let cursorStartPos = this.textareaRef.current.selectionStart;
        let cursorEndPos = this.textareaRef.current.selectionEnd;
        let textBeforeCursorStart = this.state.runningValue.substring(0, cursorStartPos);
        let textAfterCursorEnd = this.state.runningValue.substring(cursorEndPos, this.state.runningValue.length);

        let updatedText = textBeforeCursorStart + key + textAfterCursorEnd;
    
        this.setState({
            runningValue: updatedText
        });
        
        this.setState(prevState => {
            if(selectedText !== ""){
                return {cursorPos:{
                        start: cursorStartPos + 1,
                        end: cursorEndPos + 1
                        },
                        selected: true
                    }
            }
            else if(this.state.selected && selectedText === "")
            {
                return {cursorPos:{
                    start: prevState.cursorPos.start + 1,
                    end: prevState.cursorPos.end + 1
                    },
                    selected: true
                }
            }
        }, () => {
            this.textareaRef.current.setSelectionRange(this.state.cursorPos.start, this.state.cursorPos.start);
            this.textareaRef.current.blur();
            this.textareaRef.current.focus();
            this.textareaRef.current.setSelectionRange(this.state.cursorPos.start, this.state.cursorPos.start);
        });
    }

    deleteTextFromDisplay = (selectedText) => {
        let cursorStartPos = this.textareaRef.current.selectionStart;
        let cursorEndPos = this.textareaRef.current.selectionEnd;
        let textBeforeCursorStart = this.state.runningValue.substring(0, cursorStartPos);
        let textAfterCursorEnd = this.state.runningValue.substring(cursorEndPos, this.state.runningValue.length);

        let updatedText = "";
        let sliced = "";

        if(selectedText !== ""){
            updatedText = textBeforeCursorStart + textAfterCursorEnd;
        }
        else if(this.state.selected && selectedText === "")
        {
            sliced = textBeforeCursorStart.slice(0, -1);
            updatedText = sliced + textAfterCursorEnd;
        }

        if(updatedText === ""){
            this.setState({runningValue: "",
            selected: false,
            cursorPos: {start: 0, end: 0}
            })   
        }
        else
        {
            this.setState({
                runningValue: updatedText
            });
        }

        this.setState(prevState => {
            
            if(selectedText !== "")
            {
                return {cursorPos: {
                    start: cursorStartPos,
                    end: cursorEndPos
                    }}
            }
            else if(this.state.selected && selectedText === "")
            {
                return {cursorPos: {
                    start: prevState.cursorPos.start - 1,
                    end: prevState.cursorPos.end - 1
                    }}
            }
            
        }, () => {
            this.textareaRef.current.setSelectionRange(this.state.cursorPos.start, this.state.cursorPos.start);
            this.textareaRef.current.blur();
            this.textareaRef.current.focus();
            this.textareaRef.current.setSelectionRange(this.state.cursorPos.start, this.state.cursorPos.start);
        });
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