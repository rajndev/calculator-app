class ParenthesesProcessor {
    static getNextParenthesis = (calcComponent) => {
        if (calcComponent.state.cursorPosition.start === 0) {
            return "(";
        } else {
            let leftParentheseNearestIndex = calcComponent.state.runningValue.lastIndexOf("(", calcComponent.state.cursorPosition.start - 1);
            let rightParentheseNearestIndex = calcComponent.state.runningValue.lastIndexOf(")", calcComponent.state.cursorPosition.start - 1);
     
            if (leftParentheseNearestIndex > rightParentheseNearestIndex) {
                return ")";
            } else {
                return "(";
            }
        }
    }
}

export default ParenthesesProcessor;