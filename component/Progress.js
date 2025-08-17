import { useContext } from "react";
import {QuizContext} from "./QuizProvider";

const Progress = () => {
    const {index,noq,points,maxPoints,answer} = useContext(QuizContext);
    return (
        <div className="progress">
            
            <progress max = {noq} value = {index + Number(answer!== null)} />
            <p>Question <strong>{index+1}</strong>/{noq}</p>
            <p><strong>{points}</strong>/{maxPoints}</p>
        </div>
    );
};

export default Progress;