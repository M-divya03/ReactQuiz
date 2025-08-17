import { useEffect, useReducer } from "react";
import QuestionListing from "../Component/QuestionListing";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import "../src/quiz.css";
import NextQuestion from "./NextQuestion";

const initialState = {
    questions:[],
    status:"loading", //load,err,ready,active,finished
    index:0,
    answer:null,
    points:0,
};

function reducer (state,action) {
    switch(action.type){
        case 'dataReceived':
            return {
                ...state,
                questions:action.payload,
                status:"ready"
            };
        case 'dataFailed':
            return {
                ...state,
                status:"error"
            };
        case 'start':
            return{
                ...state,
                status:"active"
            }    
        case 'newAnswer':
            const qn = state.questions.at(state.index);
            return{
                ...state,
                answer: action.payload ,
                points : action.payload === qn.correctOption ?
                state.points + qn.points :
                state.points,
            }
        case "nextQuestion":
            return {...state,index:state.index+1};            
        default:
            throw new Error("unknown action");    
    }
}

const ReactQuiz = () => {

    const[state,dispatch]=useReducer(reducer,initialState);
    const {questions,status,index,answer,points}=state;
    console.log("questions",questions);  
    console.log("length ",questions.length);  
    useEffect(function () {
        fetch("http://localhost:8000/questions")
        .then((res) => res.json())
        .then((data) => dispatch({type:"dataReceived",
            payload:data}))
        .catch((err) =>dispatch({type:"dataFailed"}));
    },[]);

    return (
        <div className="quiz-container">
            <h1 className="quizHeader">The REACT QUIZ</h1>
            <QuestionListing>
               {status === "loading" && <Loader />}
               {status === "error" && <Error />}
               {status === "ready" && <StartScreen 
               noq = {questions.length} 
               dispatch = {dispatch}
               /> }
               {status === "active" && <Question 
               qn = {questions[index]}
               dispatch = {dispatch}
               answer = {answer} 
                points = {points}
               />}
               <NextQuestion 
                dispatch = {dispatch} 
                answer = {answer}
                />
            </QuestionListing>
        </div>
    );
}

export default ReactQuiz;