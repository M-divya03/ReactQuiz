import { useContext } from "react";
import {QuizContext} from "./QuizProvider";

const Options = () => {
    const {qn,dispatch,answer,index} = useContext(QuizContext);
     const question = qn[index];
    if (!question || !question.options) return null;

    const hasAnswered = answer !== null;
    return (
        <div className="options">
            {question.options.map(
                (option,index) => (                  
                    <button 
                        className={`btn btn-option ${index === answer ? 
                            "answer":""} 
                            ${hasAnswered ? 
                                index === question.correctOption ? 
                                "correct"
                                :"wrong" 
                            : "" 
                        }`}
                        key = {index}
                        disabled = {hasAnswered}
                        onClick ={
                            () => {
                                dispatch({type:"newAnswer",payload:index})}
                        }>
                        {option}
                    </button>
                ))}
        </div>                    
    );
    
};

export default Options;