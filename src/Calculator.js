import React, { Component } from 'react'
import Display from './components/Display'
import Keypad from './components/Keypad'

class Calculator extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayValue: 0,
    };
  }

  handleClick(i) {
    this.setState({displayValue: i})
  }

  render() {
    return (
      <div className="container">
        <Display value={this.state.displayValue}/>
        <Keypad onClick={i => this.handleClick(i)} />
      </div>
    )
  }
}

export default Calculator;
