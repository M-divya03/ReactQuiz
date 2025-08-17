import { useContext } from "react";
import {QuizContext} from "./QuizProvider";

const NextQuestion = () => {
    const {dispatch,answer,index,noq} = useContext(QuizContext);
    if(answer == null) return null ;

    if(index < noq -1){
    return (
        <button className="btn btn-ui" onClick={
            () => dispatch({type:"nextQuestion"})
        }>
            Next
        </button>
    );
    }if(index == noq-1){
        return (<button onClick={
            () => dispatch({type:"finish"})
        }>
        Finish</button>);
    }
};

export default NextQuestion;