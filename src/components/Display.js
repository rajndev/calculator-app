import React, { Component } from 'react'

class Display extends Component {
    constructor(props){
        super(props)
       this.textareaRef = React.createRef(null);
    }
    
    componentDidMount () {
        this.scrollToBottom();

    }
      componentDidUpdate () {
        this.scrollToBottom();
    }
      scrollToBottom = () => {
          if(this.textareaRef != null){
              this.textareaRef.current.scrollTop = this.textareaRef.current.scrollHeight;
            }
    }

    render() {
        return (
            <div className="display">
                <div>
                    <textarea type="text" className="user-inputs" value={this.props.value} ref={this.textareaRef} onChange={() => this.props.onInputChange(this.textareaRef)} onSelect={this.props.onSelect} />
                </div>
            </div>
        )
    }
}

export default Display;