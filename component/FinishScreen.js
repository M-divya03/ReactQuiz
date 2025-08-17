import { useContext } from "react";
import { QuizContext } from "./QuizProvider";

const FinishScreen = () => {
    const {points,maxPoints,dispatch} = useContext(QuizContext);
    const percentage = (points/maxPoints)*100;
    return (
        <>
        <p className="result">
            you scored <strong>{points}</strong>
            out of {maxPoints}
        </p>
        <button onClick={() => dispatch({type:"Restart"})}>
            Restart Quiz
        </button>
        </>
    );
};

export default FinishScreen;