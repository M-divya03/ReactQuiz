import { useReducer } from "react";
import { createContext, useEffect, useReducer,useContext } from "react";
import Options from "./Options";

export const QuizContext = createContext();

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

export const QuizProvider = ({children}) => {
       const[state,dispatch]= useReducer(reducer,initialState);
        const {questions,status,index,answer,points,secondsRemaining}=state;
        const maxPoints = questions.reduce((prev,cur) =>(
            prev+ cur.points
        ),0);
        const noq=questions.length;
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
            <QuizContext.Provider
                value={{
                    index,
                    noq,
                    points,
                    maxPoints,
                    answer,
                    dispatch,
                    qn:questions,
                    status,
                    ...state,
                    Options
                }}>
                {children}
            </QuizContext.Provider>
        );
};

// export default QuizProvider;