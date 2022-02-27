import React, { Component } from 'react'
import Display from './Display'
import Keypad from './Keypad'
import * as math from 'mathjs'

class Calculator extends Component {
  constructor(props){
    super(props);
    this.state = {
     displayValue: ""
    };
  }

  handleKeyClick(i) {
    this.setState({displayValue: this.state.displayValue.concat(i)});

    if(this.state.displayValue != ""){
      let fdsa = this.state.displayValue.length % 2
      if(fdsa == 0){
        this.setState({displayValue: this.state.displayValue.concat(i + '\n')});
      }
    }
  }

  handleEqualsClick() {
    
    let trimmed = this.state.displayValue.replace(/[\n\r]+/g, '')
    let result;

    try {
      result = math.evaluate(trimmed);
    }
    catch{
       return; 
    }
    this.setState({displayValue: result});
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
