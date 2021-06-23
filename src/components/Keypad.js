import React, { Component } from 'react'
import Key from './Key'

class Keypad extends Component {
    render() {
        return (
            <div className="keys">
                <div className="row">
                    <Key keyValue="C" style="key helper" onClick={() => this.props.onClick("C")}/>
                    <Key keyValue="(" style="key helper" onClick={() => this.props.onClick("(")}/>
                    <Key keyValue=")" style="key helper" onClick={() => this.props.onClick(")")}/>
                    <Key keyValue="+" style="key operator" onClick={() => this.props.onClick("+")}/>

                    <Key keyValue="7" style="key" onClick={() => this.props.onClick(7)}/>
                    <Key keyValue="8" style="key" onClick={() => this.props.onClick(8)}/>
                    <Key keyValue="9" style="key" onClick={() => this.props.onClick(9)}/>
                    <Key keyValue="-" style="key operator" onClick={() => this.props.onClick("-")}/>

                    <Key keyValue="4" style="key" onClick={() => this.props.onClick(4)}/>
                    <Key keyValue="5" style="key" onClick={() => this.props.onClick(5)}/>
                    <Key keyValue="6" style="key" onClick={() => this.props.onClick(6)}/>
                    <Key keyValue="x" style="key operator" onClick={() => this.props.onClick("x")}/>


                    <Key keyValue="1" style="key" onClick={() => this.props.onClick(1)}/>
                    <Key keyValue="2" style="key" onClick={() => this.props.onClick(2)}/>
                    <Key keyValue="3" style="key" onClick={() => this.props.onClick(3)}/>
                    <Key keyValue="/" style="key operator" onClick={() => this.props.onClick("/")}/>

                    <Key keyValue="0" style="key" onClick={() => this.props.onClick(0)}/>
                    <Key keyValue="." style="key" onClick={() => this.props.onClick(".")}/>
                    <Key keyValue="←" style="key" onClick={() => this.props.onClick("←")}/>
                    <Key keyValue="=" style="key equals-key" onClick={() => this.props.onClick("=")}/>

                </div>
            </div>
        )
    }
}

export default Keypad;
