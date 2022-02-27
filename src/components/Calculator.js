import React, { Component } from 'react'
import Display from './Display'
import Keypad from './Keypad'
import * as math from 'mathjs'

class Calculator extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayValue: "",
    };
  }

  handleKeyClick(i) {
    if(this.state.displayValue.length == 1000){
      alert("You can't enter more than 19 digits!");
    }
    else {
      this.setState({displayValue: this.state.displayValue + i});
    } 
  }

  handleEqualsClick() {
    let result;
    try {
      result = math.evaluate(this.state.displayValue);
    }
    catch{
       return; 
    }
    this.setState({displayValue: result.toString()});
  }

  handleClearClick() {
    this.setState({displayValue: ""});
  }

  handleBackClick() {
    let sliced = this.state.displayValue.slice(0, -1);
    this.setState({displayValue: sliced});
  }

  render() {
    return (
      <div className="container">
        <Display dispValue={this.state.displayValue}/>
        <Keypad onKeyClick={i => this.handleKeyClick(i)} 
                onEqualsKeyClick={() => this.handleEqualsClick()} 
                onClearKeyClick={() => this.handleClearClick()} 
                onBackKeyClick={() => this.handleBackClick()}/>
      </div>
    )
  }
}

export default Calculator;
