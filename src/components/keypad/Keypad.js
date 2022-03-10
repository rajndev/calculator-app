import React, { Component } from 'react'
import './keypad.css'

class Keypad extends Component {
    render(e) {
        return (
            <div className="keys">
                <div className="row">
                    <button name="C" className="helper" onClick={(e) => this.props.onClearKeyClick(e.target.name)}>C</button>
                    <button name="%" className="helper" onClick={(e) => this.props.onKeyClick(e.target.name)}>%</button>
                    <button name="()" className="helper" onClick={(e) => this.props.onKeyClick(e.target.name)}>( )</button>
                    <button name="+" className="operator" onClick={(e) => this.props.onKeyClick(e.target.name)}>+</button>

                    <button name="7"  onClick={(e) => this.props.onKeyClick(e.target.name)}>7</button>
                    <button name="8"  onClick={(e) => this.props.onKeyClick(e.target.name)}>8</button>
                    <button name="9"  onClick={(e) => this.props.onKeyClick(e.target.name)}>9</button>
                    <button name="-" className="operator" onClick={(e) => this.props.onKeyClick(e.target.name)}>-</button>

                    <button name="4"  onClick={(e) => this.props.onKeyClick(e.target.name)}>4</button>
                    <button name="5"  onClick={(e) => this.props.onKeyClick(e.target.name)}>5</button>
                    <button name="6"  onClick={(e) => this.props.onKeyClick(e.target.name)}>6</button>
                    <button name="*" className="operator" onClick={(e) => this.props.onKeyClick(e.target.name)}>x</button>

                    <button name="1"  onClick={(e) => this.props.onKeyClick(e.target.name)}>1</button>
                    <button name="2"  onClick={(e) => this.props.onKeyClick(e.target.name)}>2</button>
                    <button name="3"  onClick={(e) => this.props.onKeyClick(e.target.name)}>3</button>
                    <button name="/" className="operator" onClick={(e) => this.props.onKeyClick(e.target.name)}>÷</button>

                    <button name="0"  onClick={(e) => this.props.onKeyClick(e.target.name)}>0</button>
                    <button name="."  onClick={(e) => this.props.onKeyClick(e.target.name)}>.</button>
                    <button name="←"  onClick={(e) => this.props.onBackKeyClick(e.target.name)}>←</button>
                    <button name="=" className="equals-key" onClick={(e) => this.props.onEqualsKeyClick(e)}>=</button>
                </div>
            </div>
        )
    }
}

export default Keypad;
