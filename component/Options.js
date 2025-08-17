// import Question from "./Question";

const Options = ({qn,dispatch,answer}) => {

    if (!qn || !qn.options) return null;

    const hasAnswered = answer !== null;
    return (
        <div className="options">
            {qn.options.map(
                (option,index) => (                  
                    <button 
                        className={`btn btn-option ${index === answer ? 
                            "answer":""} 
                            ${hasAnswered ? 
                                index === qn.correctOption ? 
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