import { useContext, useEffect } from "react";
import {QuizContext} from "./QuizProvider";

const Timer = () => {
    const {dispatch,secondsRemaining} = useContext(QuizContext);
    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining%60;
    useEffect(() => {
        const id = setInterval(() => {
        dispatch({ type: "tick" });
        }, 1000);
        return () => clearInterval(id);
    },[dispatch]);
    return (
        <div className="timer">
            {mins<10 && "0"}{mins}:{secs<10 && "0"}{secs}
        </div>
    );
};

export default Timer;