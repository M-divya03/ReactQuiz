// import Question from "./Question";

const Options = ({qn,dispatch,answer}) => {

    if (!qn || !qn.options) return null;
    return (
        <div className="options">
            {qn.options.map(
                (option,index) => (                  
                    <button 
                        className={`btn btn-option ${index === answer ? 
                            "answer":""} 
                            ${ answer !== null ? 
                                index === qn.correctOption ? "correct":"wrong" 
                            : "" }`}
                        key = {index}
                        disabled = {answer !== null}
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