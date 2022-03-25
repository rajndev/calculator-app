(this["webpackJsonpcalculator-app"]=this["webpackJsonpcalculator-app"]||[]).push([[0],{37:function(t,e,n){},39:function(t,e,n){},40:function(t,e,n){},50:function(t,e){},53:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),i=n(11),o=n.n(i),c=n(7),s=n(10),u=n(23),l=n(14),d=n(13),h=n(30),f=n.n(h),p=(n(37),n(1)),g=function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(t){var r;return Object(c.a)(this,n),(r=e.call(this,t)).textareaRef=a.a.createRef(null),r}return Object(s.a)(n,[{key:"componentDidMount",value:function(){this.props.getRef(this.textareaRef),f()("#user-inputs").on("keypress cut copy paste",(function(t){var e={NUMPAD_ZERO_KEY:48,NUMPAD_NINE_KEY:57,NUMPAD_DOT_KEY:46,NUMPAD_PLUS_KEY:43,NUMPAD_MINUS_KEY:45,NUMPAD_MULTIPLY_KEY:42,NUMPAD_DIVIDE_KEY:47};return Object.freeze(e),t.which>=e.NUMPAD_ZERO_KEY&&t.which<=e.NUMPAD_NINE_KEY||t.which===e.NUMPAD_DOT_KEY||t.which===e.NUMPAD_PLUS_KEY||t.which===e.NUMPAD_MINUS_KEY||t.which===e.NUMPAD_MULTIPLY_KEY||t.which===e.NUMPAD_DIVIDE_KEY||(t.preventDefault(),!1)})),this.textareaRef.current.setSelectionRange(0,0),this.textareaRef.current.blur(),this.textareaRef.current.focus(),this.textareaRef.current.setSelectionRange(0,0)}},{key:"render",value:function(){return Object(p.jsxs)("div",{className:"display",children:[Object(p.jsx)("div",{children:Object(p.jsx)("textarea",{type:"text",id:"user-inputs",className:"user-inputs",value:this.props.value,ref:this.textareaRef,onChange:this.props.onChange,onSelect:this.props.onSelect})}),Object(p.jsxs)("div",{className:"counter",children:[this.props.counter," characters left"]})]})}}]),n}(r.Component),j=(n(39),function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){var t=this;return Object(p.jsx)("div",{className:"keys",children:Object(p.jsxs)("div",{className:"row",children:[Object(p.jsx)("button",{name:"C",className:"helper",onClick:function(e){return t.props.onClearKeyClick(e.target.name)},children:"C"}),Object(p.jsx)("button",{name:"%",className:"helper",onClick:function(e){return t.props.onKeyClick(e.target.name)},children:"%"}),Object(p.jsx)("button",{name:"()",className:"helper",onClick:function(e){return t.props.onKeyClick(e.target.name)},children:"( )"}),Object(p.jsx)("button",{name:"+",className:"operator",onClick:function(e){return t.props.onKeyClick(e.target.name)},children:"+"}),Object(p.jsx)("button",{name:"7",onClick:function(e){return t.props.onKeyClick(e.target.name)},children:"7"}),Object(p.jsx)("button",{name:"8",onClick:function(e){return t.props.onKeyClick(e.target.name)},children:"8"}),Object(p.jsx)("button",{name:"9",onClick:function(e){return t.props.onKeyClick(e.target.name)},children:"9"}),Object(p.jsx)("button",{name:"-",className:"operator",onClick:function(e){return t.props.onKeyClick(e.target.name)},children:"-"}),Object(p.jsx)("button",{name:"4",onClick:function(e){return t.props.onKeyClick(e.target.name)},children:"4"}),Object(p.jsx)("button",{name:"5",onClick:function(e){return t.props.onKeyClick(e.target.name)},children:"5"}),Object(p.jsx)("button",{name:"6",onClick:function(e){return t.props.onKeyClick(e.target.name)},children:"6"}),Object(p.jsx)("button",{name:"*",className:"operator",onClick:function(e){return t.props.onKeyClick(e.target.name)},children:"x"}),Object(p.jsx)("button",{name:"1",onClick:function(e){return t.props.onKeyClick(e.target.name)},children:"1"}),Object(p.jsx)("button",{name:"2",onClick:function(e){return t.props.onKeyClick(e.target.name)},children:"2"}),Object(p.jsx)("button",{name:"3",onClick:function(e){return t.props.onKeyClick(e.target.name)},children:"3"}),Object(p.jsx)("button",{name:"/",className:"operator",onClick:function(e){return t.props.onKeyClick(e.target.name)},children:"\xf7"}),Object(p.jsx)("button",{name:"0",onClick:function(e){return t.props.onKeyClick(e.target.name)},children:"0"}),Object(p.jsx)("button",{name:".",onClick:function(e){return t.props.onKeyClick(e.target.name)},children:"."}),Object(p.jsx)("button",{name:"\u2190",onClick:function(e){return t.props.onBackKeyClick(e.target.name)},children:"\u2190"}),Object(p.jsx)("button",{name:"=",className:"equals-key",onClick:function(e){return t.props.onEqualsKeyClick(e)},children:"="})]})})}}]),n}(r.Component)),b=n(56),x=(n(40),function t(){Object(c.a)(this,t)});x.getNextParenthesis=function(t){return 0===t.state.cursorPosition.start?"(":t.state.runningValue.lastIndexOf("(",t.state.cursorPosition.start-1)>t.state.runningValue.lastIndexOf(")",t.state.cursorPosition.start-1)?")":"("};var O=x,C=n(12),k=(n(41),function(t){Object(l.a)(n,t);var e=Object(d.a)(n);function n(t){var r;return Object(c.a)(this,n),(r=e.call(this,t)).handleKeyClick=function(t){if(!(r.counter<=0)){"()"===t&&(t=O.getNextParenthesis(Object(u.a)(r)));var e=r.state.cursorPosition.start===r.state.runningValue.length+1;if(""===r.state.runningValue||e)return r.setState((function(e){return{runningValue:e.runningValue.concat(t),cursorPosition:{start:e.cursorPosition.start+1,end:e.cursorPosition.end+1}}}),(function(){r.setInputSelectionRange(r.state.cursorPosition.start,r.state.cursorPosition.start),r.counter=50-r.state.runningValue.length})),void(null!=r.textareaRef&&(r.textareaRef.current.scrollTop=r.textareaRef.current.scrollHeight));r.insertTextIntoDisplay(t)}},r.insertTextIntoDisplay=function(t){var e=r.textareaRef.current.selectionStart,n=r.textareaRef.current.selectionEnd,a=r.state.runningValue.substring(0,e),i=r.state.runningValue.substring(n,r.state.runningValue.length);"("!==t&&")"!==t||(t=O.getNextParenthesis(Object(u.a)(r)));var o=a+t+i;r.setState({runningValue:o,cursorPosition:{start:e+1,end:n+1}},(function(){r.setInputSelectionRange(r.state.cursorPosition.start,r.state.cursorPosition.start),r.counter=50-r.state.runningValue.length}))},r.handleInputChange=function(){r.setState({runningValue:r.textareaRef.current.value},(function(){r.counter=50-r.state.runningValue.length}))},r.handleSelect=function(t){if(""===r.state.runningValue)return r.setState({cursorPosition:{start:0,end:0}}),void r.setInputSelectionRange(0,0);r.setState({cursorPosition:{start:t.target.selectionStart,end:t.target.selectionEnd}},(function(){r.setInputSelectionRange(r.state.cursorPosition.start,r.state.cursorPosition.end)}))},r.handleEqualsClick=function(){var t=0;try{if(r.state.runningValue.includes("/0"))return void r.showModal("zero");t=b.a(r.state.runningValue),r.setState({runningValue:t.toString()},(function(){var t=50-r.state.runningValue.length;r.counter=t<0?0:t}));var e=t.toString().length;r.setState({cursorPosition:{start:e,end:e}},(function(){r.setInputSelectionRange(e,e)}))}catch(n){return void r.showModal("invalid")}},r.handleClearClick=function(){r.setState({runningValue:"",cursorPosition:{start:0,end:0}}),r.setInputSelectionRange(0,0),r.counter=50},r.handleBackClick=function(){var t=0===r.textareaRef.current.selectionStart&&0===r.textareaRef.current.selectionEnd;if(""===r.state.runningValue||t)return r.setInputSelectionRange(0,0),void(r.counter=50);var e=r.state.runningValue.substring(r.textareaRef.current.selectionStart,r.textareaRef.current.selectionEnd);r.deleteTextFromDisplay(e)},r.deleteTextFromDisplay=function(t){var e=r.textareaRef.current.selectionStart,n=r.textareaRef.current.selectionEnd,a=r.state.runningValue.substring(0,e),i=r.state.runningValue.substring(n,r.state.runningValue.length),o=t?a+i:a.slice(0,-1)+i;if(o)return r.setState({runningValue:o},(function(){r.counter=50-r.state.runningValue.length})),t?void r.setState({cursorPosition:{start:e,end:n}},(function(){r.setInputSelectionRange(r.state.cursorPosition.start,r.state.cursorPosition.start)})):void r.setState((function(t){return{cursorPosition:{start:t.cursorPosition.start-1,end:t.cursorPosition.end-1}}}),(function(){r.setInputSelectionRange(r.state.cursorPosition.start,r.state.cursorPosition.start)}));r.setState({runningValue:"",cursorPosition:{start:0,end:0}}),r.setInputSelectionRange(0,0),r.counter=50},r.setInputSelectionRange=function(t,e){r.textareaRef.current.setSelectionRange(t,e),r.textareaRef.current.blur(),r.textareaRef.current.focus(),r.textareaRef.current.setSelectionRange(t,e)},r.getTextareaRef=function(t){r.textareaRef=t},r.showModal=function(t){"invalid"!==t?r.setState({isDivideByZeroModalOpen:!0}):r.setState({isInvalidInputModalOpen:!0})},r.hideModal=function(t){"invalid"!==t?r.setState({isDivideByZeroModalOpen:!1}):r.setState({isInvalidInputModalOpen:!1})},r.state={runningValue:"",cursorPosition:{start:0,end:0},isDivideByZeroModalOpen:!1,isInvalidInputModalOpen:!1},r.textareaRef=a.a.createRef(null),r.counter=50,r}return Object(s.a)(n,[{key:"render",value:function(){var t=this;return Object(p.jsxs)("div",{className:"container",children:[Object(p.jsxs)(C.a,{show:this.state.isInvalidInputModalOpen,onHide:function(){return t.hideModal("invalid")},children:[Object(p.jsx)(C.a.Header,{closeButton:!0,children:Object(p.jsx)(C.a.Title,{children:"Input Error"})}),Object(p.jsx)(C.a.Body,{children:"Your mathematical expression is invalid!"})]}),Object(p.jsxs)(C.a,{show:this.state.isDivideByZeroModalOpen,onHide:function(){return t.hideModal("zero")},children:[Object(p.jsx)(C.a.Header,{closeButton:!0,children:Object(p.jsx)(C.a.Title,{children:"Invalid Operation"})}),Object(p.jsx)(C.a.Body,{children:"You can't divide by 0!"})]}),Object(p.jsx)(g,{value:this.state.runningValue,counter:this.counter,onChange:function(){return t.handleInputChange()},onSelect:function(e){return t.handleSelect(e)},getRef:function(e){return t.getTextareaRef(e)}}),Object(p.jsx)(j,{onKeyClick:function(e){return t.handleKeyClick(e)},onEqualsKeyClick:function(){return t.handleEqualsClick()},onClearKeyClick:function(){return t.handleClearClick()},onBackKeyClick:function(){return t.handleBackClick()}})]})}}]),n}(r.Component)),m=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,57)).then((function(e){var n=e.getCLS,r=e.getFID,a=e.getFCP,i=e.getLCP,o=e.getTTFB;n(t),r(t),a(t),i(t),o(t)}))};o.a.render(Object(p.jsx)(a.a.StrictMode,{children:Object(p.jsx)(k,{})}),document.getElementById("root")),m()}},[[53,1,2]]]);
//# sourceMappingURL=main.5e13f05c.chunk.js.map