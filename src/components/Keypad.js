import React, { Component } from 'react'
import Key from './Key'

class Keypad extends Component {
    render() {
        return (
            <div className="keys">
                <div className="row">
                    <Key keyValue="C" style="key helper" onClick={() => this.props.onClearKeyClick("C")}/>
                    <Key keyValue="(" style="key helper" onClick={() => this.props.onKeyClick("(")}/>
                    <Key keyValue=")" style="key helper" onClick={() => this.props.onKeyClick(")")}/>
                    <Key keyValue="+" style="key operator" onClick={() => this.props.onKeyClick("+")}/>

                    <Key keyValue="7" style="key" onClick={() => this.props.onKeyClick(7)}/>
                    <Key keyValue="8" style="key" onClick={() => this.props.onKeyClick(8)}/>
                    <Key keyValue="9" style="key" onClick={() => this.props.onKeyClick(9)}/>
                    <Key keyValue="-" style="key operator" onClick={() => this.props.onKeyClick("-")}/>

                    <Key keyValue="4" style="key" onClick={() => this.props.onKeyClick(4)}/>
                    <Key keyValue="5" style="key" onClick={() => this.props.onKeyClick(5)}/>
                    <Key keyValue="6" style="key" onClick={() => this.props.onKeyClick(6)}/>
                    <Key keyValue="x" style="key operator" onClick={() => this.props.onKeyClick("*")}/>

                    <Key keyValue="1" style="key" onClick={() => this.props.onKeyClick(1)}/>
                    <Key keyValue="2" style="key" onClick={() => this.props.onKeyClick(2)}/>
                    <Key keyValue="3" style="key" onClick={() => this.props.onKeyClick(3)}/>
                    <Key keyValue="÷" style="key operator" onClick={() => this.props.onKeyClick("/")}/>

                    <Key keyValue="0" style="key" onClick={() => this.props.onKeyClick(0)}/>
                    <Key keyValue="." style="key" onClick={() => this.props.onKeyClick(".")}/>
                    <Key keyValue="←" style="key" onClick={() => this.props.onBackKeyClick("←")}/>
                    <Key keyValue="=" style="key equals-key" onClick={() => this.props.onEqualsKeyClick()}/>
                </div>
            </div>
        )
    }
}

export default Keypad;
