const FinishScreen = ({points,maxPoints,dispatch}) => {
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