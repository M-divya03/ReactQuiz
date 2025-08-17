
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
import {QuizProvider,QuizContext} from "./QuizProvider";
import { useContext } from "react";

const QuizUI = () => {
  const { status } = useContext(QuizContext);

  return (
    <QuestionListing>
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen />}
      {status === "active" && (
        <>
          <Progress />
          <Question />
          <Footer>
            <Timer />
            <NextQuestion />
          </Footer>
        </>
      )}
      {status === "finish" && <FinishScreen />}
    </QuestionListing>
  );
};

const ReactQuiz = () => {
  return (
    <div className="quiz-container">
      <h1 className="quizHeader">The REACT QUIZ</h1>
      <QuizProvider>
        <QuizUI />
      </QuizProvider>
    </div>
  );
};

export default ReactQuiz;
