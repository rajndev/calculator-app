import React, { Component } from 'react'
import './keypad.css'

class Keypad extends Component {
    render() {
        return (
            <div className="keys">
                <div className="row">
                    <button name="C" className="helper rounded-circle" onClick={(e) => this.props.onClearKeyClick(e.target.name)}>C</button>
                    <button name="%" className="helper rounded-circle" onClick={(e) => this.props.onKeyClick(e.target.name)}>%</button>
                    <button name="()" className="helper rounded-circle" onClick={(e) => this.props.onKeyClick(e.target.name)}>( )</button>
                    <button name="&#44;" className="operator rounded-circle" onClick={(e) => this.props.onKeyClick(e.target.name)}>&#43;</button>
                </div>
                <div className="row">
                    <button name="7"  className="rounded-circle" onClick={(e) => this.props.onKeyClick(e.target.name)}>7</button>
                    <button name="8"  className="rounded-circle" onClick={(e) => this.props.onKeyClick(e.target.name)}>8</button>
                    <button name="9"  className="rounded-circle" onClick={(e) => this.props.onKeyClick(e.target.name)}>9</button>
                    <button name="-" className="operator rounded-circle" onClick={(e) => this.props.onKeyClick(e.target.name)}>-</button>
                </div>
                <div className="row">
                    <button name="4"  className="rounded-circle" onClick={(e) => this.props.onKeyClick(e.target.name)}>4</button>
                    <button name="5"  className="rounded-circle" onClick={(e) => this.props.onKeyClick(e.target.name)}>5</button>
                    <button name="6"  className="rounded-circle" onClick={(e) => this.props.onKeyClick(e.target.name)}>6</button>
                    <button name="*" className="operator rounded-circle" onClick={(e) => this.props.onKeyClick(e.target.name)}>x</button>
                </div>    
                <div className="row">
                    <button name="1"  className="rounded-circle" onClick={(e) => this.props.onKeyClick(e.target.name)}>1</button>
                    <button name="2"  className="rounded-circle" onClick={(e) => this.props.onKeyClick(e.target.name)}>2</button>
                    <button name="3"  className="rounded-circle" onClick={(e) => this.props.onKeyClick(e.target.name)}>3</button>
                    <button name="/" className="operator rounded-circle" onClick={(e) => this.props.onKeyClick(e.target.name)}>÷</button>
                </div>  
                <div className="row">
                    <button name="0"  className="rounded-circle" onClick={(e) => this.props.onKeyClick(e.target.name)}>0</button>
                    <button name="."  className="rounded-circle" onClick={(e) => this.props.onKeyClick(e.target.name)}>.</button>
                    <button name="←"  className="rounded-circle" onClick={(e) => this.props.onBackKeyClick(e.target.name)}>←</button>
                    <button name="=" className="equals-key rounded-circle" onClick={(e) => this.props.onEqualsKeyClick(e)}>=</button>
                </div>
            </div>
        )
    }
}

export default Keypad;
