import Options from "./Options";

const Question = ({qn,dispatch,answer,points}) => {
    console.log("qn ",qn);
    return(
        <div>
          <h4>{qn.question}</h4>  
          <p>points:{points}</p>
          {/* {console.log("option prop qn",qn)} */}
         <div className="options">
         <Options 
            qn={qn} 
            dispatch ={dispatch} 
            answer = {answer} 
            />
            </div>
        </div>
    );
};

export default Question;