const StartScreen = ({noq,dispatch}) => {
    return(
        <div>
            <h2>Welcome to the React Quiz</h2>
            <p>{noq} questions to test your knowledge!</p>
            <button onClick={() => dispatch({type:"start"})}>Let's start</button>
        </div>
    );
};

export default StartScreen;