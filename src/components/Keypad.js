import React, { Component } from 'react'
import Key from './Key'

class Keypad extends Component {
    render() {
        return (
            <div className="keys">
                <div className="row">
                    <Key keyValue="C" styleProp="key helper" onClick={() => this.props.onClearKeyClick("C")}/>
                    <Key keyValue="%" styleProp="key helper" onClick={() => this.props.onKeyClick("%")}/>
                    <Key keyValue="( )" styleProp="key helper" onClick={() => this.props.onKeyClick("()")}/>
                  
                    <Key keyValue="+" styleProp="key operator" onClick={() => this.props.onKeyClick("+")}/>

                    <Key keyValue="7" styleProp="key" onClick={() => this.props.onKeyClick(7)}/>
                    <Key keyValue="8" styleProp="key" onClick={() => this.props.onKeyClick(8)}/>
                    <Key keyValue="9" styleProp="key" onClick={() => this.props.onKeyClick(9)}/>
                    <Key keyValue="-" styleProp="key operator" onClick={() => this.props.onKeyClick("-")}/>

                    <Key keyValue="4" styleProp="key" onClick={() => this.props.onKeyClick(4)}/>
                    <Key keyValue="5" styleProp="key" onClick={() => this.props.onKeyClick(5)}/>
                    <Key keyValue="6" styleProp="key" onClick={() => this.props.onKeyClick(6)}/>
                    <Key keyValue="x" styleProp="key operator" onClick={() => this.props.onKeyClick("*")}/>

                    <Key keyValue="1" styleProp="key" onClick={() => this.props.onKeyClick(1)}/>
                    <Key keyValue="2" styleProp="key" onClick={() => this.props.onKeyClick(2)}/>
                    <Key keyValue="3" styleProp="key" onClick={() => this.props.onKeyClick(3)}/>
                    <Key keyValue="÷" styleProp="key operator" onClick={() => this.props.onKeyClick("/")}/>

                    <Key keyValue="0" styleProp="key" onClick={() => this.props.onKeyClick(0)}/>
                    <Key keyValue="." styleProp="key" onClick={() => this.props.onKeyClick(".")}/>
                    <Key keyValue="←" styleProp="key" onClick={() => this.props.onBackKeyClick("←")}/>
                    <Key keyValue="=" styleProp="key equals-key" onClick={() => this.props.onEqualsKeyClick()}/>
                </div>
            </div>
        )
    }
}

export default Keypad;
