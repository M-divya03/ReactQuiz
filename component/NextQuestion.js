const NextQuestion = ({dispatch,answer}) => {
    if(answer == null) return null ;

    return (
        <button className="btn btn-ii" onClick={
            () => dispatch({type:"nextQuestion"})
        }>
            Next
        </button>
    );
};

export default NextQuestion;