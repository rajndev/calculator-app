class ParenthesesProcessor {
    static getNextParenthesis = (calcComponent) => {
        if (calcComponent.state.cursorPos.start === 0) {
            return "(";
        } else {
            //get the indexes of the last instance of "(" and ")" from the left of the cursor 
            let leftParentheseNearestIndex = calcComponent.state.runningValue.lastIndexOf("(", calcComponent.state.cursorPos.start - 1);
            let rightParentheseNearestIndex = calcComponent.state.runningValue.lastIndexOf(")", calcComponent.state.cursorPos.start - 1);
     
            //if the closest parentheses from the left of the cursor is the left parentheses  
            if (leftParentheseNearestIndex > rightParentheseNearestIndex) {
                return ")";
            } else {
                return "(";
            }
        }
    }
}

export default ParenthesesProcessor;