class ParenthesesProcessor {
    static getNextParentheses = (calcComponent) => {
        if(calcComponent.state.cursorPos.start === 0)
        {
            return "(";
        }
        else
        {
             let leftParentheseNearestIndex = calcComponent.state.runningValue.lastIndexOf("(", calcComponent.state.cursorPos.start - 1);
             let rightParentheseNearestIndex = calcComponent.state.runningValue.lastIndexOf(")", calcComponent.state.cursorPos.start - 1);
     
             //if the closest parentheses from the left of the cursor is the left parentheses  
             if(leftParentheseNearestIndex > rightParentheseNearestIndex)
             {
             // calcComponent.setState({parentheses: "("});
                 return ")";
             }
             else
             {
                 //calcComponent.setState({parentheses: ")"});
                 return "(";
             }
        }
    }
}

export default ParenthesesProcessor;