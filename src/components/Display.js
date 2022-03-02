import React, { Component } from 'react'

//const textareaRef = React.createRef()
class Display extends Component {
    constructor(props){
        super(props)
       this.textareaRef = React.createRef(null);
    }
    
    componentDidMount () {
        console.log("Mounted!");
        this.scrollToBottom();

    }
      componentDidUpdate () {
        console.log("DidUpdate!");
        this.scrollToBottom();
    }
      scrollToBottom = () => {
          console.log(this.textareaRef != null)
          if(this.textareaRef != null){
              console.log("inside it!")
              this.textareaRef.current.scrollTop = this.textareaRef.current.scrollHeight;
           // this.textareaRef.current.scrollIntoView({ behavior: 'smooth' });
          }
         // this.textareaRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        return (
            <div className="display">
                {/* <div className='result'>
                    {this.props.result}
                </div> */}
                <div>
                    <textarea type="text" className="user-inputs" cols="15" rows="2" value={this.props.value} ref={this.textareaRef} onChange={() => this.props.onInputChange(this.textareaRef)} onSelect={this.props.onSelect} />
                </div>
            </div>
        )
    }
}

export default Display;