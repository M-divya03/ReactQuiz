import { useEffect, useReducer } from "react";
import QuestionListing from "../Component/QuestionListing";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import "../src/index.css";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";


const initialState = {
    questions:[],
    status:"loading", //load,err,ready,active,finished
    index:0,
    answer:null,
    points:0,
    secondsRemaining:null,
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
                status:"active",
                secondsRemaining:state.questions.length * 30,
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
            return {...state,index:state.index+1,answer:null};   
        case "finish":
            return{...state,status:"finish"}             
        case 'Restart':
            return {...initialState,questions:state.questions,
                status:"ready"}    
        case 'tick':
               return {...state, secondsRemaining: state.secondsRemaining > 0 
                ? state.secondsRemaining - 1: 0,
                status:state.secondsRemaining === 0 ? "finish":
                state.status,
                
        }                                
        default:
            throw new Error("unknown action");    
    }
}

const ReactQuiz = () => {

    const[state,dispatch]=useReducer(reducer,initialState);
    const {questions,status,index,answer,points,secondsRemaining}=state;
    const maxPoints = questions.reduce((prev,cur) =>(
        prev+ cur.points
    ),0);
    console.log("maxPoints",maxPoints);
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
               {status === "active" && (
                <>
                    <Progress 
                    index={index} 
                    noq={questions.length} 
                    points = {points}
                    maxPoints = {maxPoints}
                    answer={answer}
                    />
               <Question 
               qn = {questions[index]}
               dispatch = {dispatch}
               answer = {answer} 
                points = {points}
               />  
              
               <Footer>
                <Timer dispatch={dispatch}secondsRemaining = {secondsRemaining}/>
               <NextQuestion 
                dispatch = {dispatch} 
                answer = {answer}
                noq={questions.length}
                index = {index}
                />
                </Footer>
              
            </>
              )}
              {status === 'finish' && <FinishScreen
                points = {points}
                maxPoints = {maxPoints}
                dispatch={dispatch}
               />}
            </QuestionListing>
            
        </div>
    );
}

export default ReactQuiz;