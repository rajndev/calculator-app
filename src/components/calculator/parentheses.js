class ParenthesesProcessor {
    //static calcComponent = null;
    
    static handleParenthesesClick = (calcComponent) => {
        calcComponent.setState(prevState => {
            return {parenthesesCount: prevState.parenthesesCount + 1}
        });

        if(calcComponent.state.runningValue === ""){
            calcComponent.setState({ parentheses: "(" });
            return "(";
        }
        else{
            return this.getNextParentheses(calcComponent);
        }
    }

    static getNextParentheses = (calcComponent) => {
        //If a parentheses was just deleted, prevent mismatch on next parentheses value
        if(calcComponent.state.parentheses === "(" && calcComponent.state.parenthesesDeleted){
        calcComponent.setState({parentheses: "("});
        calcComponent.setState({parenthesesDeleted: false});
        return "(";
    }
    else if(calcComponent.state.parentheses === ")" && calcComponent.state.parenthesesDeleted){
        calcComponent.setState({parentheses: ")"});
        calcComponent.setState({parenthesesDeleted: false});
        return ")";
    }
    else{
        //default logic for assigning next parentheses
            if(calcComponent.state.parenthesesCount === 0){
                return "(";
            }
            else if(calcComponent.state.parentheses === "("){
                calcComponent.setState({parentheses: ")"});
                return ")";
            }
            else if(calcComponent.state.parentheses === ")"){
                calcComponent.setState({parentheses: "("});
                return "(";
            }
        }
    }

    static updateParenthesesState = (trailingChar, calcComponent) => {
        if(trailingChar === "("){
            calcComponent.setState({parentheses: "("});
            calcComponent.setState({parenthesesDeleted: true});
         }
         else if(trailingChar === ")"){
            calcComponent.setState({parentheses: ")"});
            calcComponent.setState({parenthesesDeleted: true});
         }
        calcComponent.setState(prevState => {
             if(calcComponent.state.parenthesesCount !== 0){
                 return {parenthesesCount: prevState.parenthesesCount - 1}
             }
         });    
    }
}

export default ParenthesesProcessor;