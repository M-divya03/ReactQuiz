import { useContext } from "react";
import Options from "./Options";
import {QuizContext} from "./QuizProvider";

const Question = () => {
    const {qn,dispatch,answer,points} = useContext(QuizContext);
    console.log("qn from question",qn);
    return(
        <div>
          <h4>{qn.question}</h4>  
          <p>points:{points}</p>
          <div className="options">
         <Options />
            </div>
        </div>
    );
};

export default Question;