import { useState, useCallback } from "react";
import QUESTION from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTION.length;

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setAnswerState("answered");
      setUserAnswers((prevAnswer) => {
        return [...prevAnswer, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTION[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="quiz complete" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        // key 를 입력하면 재렌더링 되지 않는 부분도 같이 재렌더링 됨
        // 하나의 div 에 중복 적용이 불가능 하므로 컴포넌트화 하여 한개로 진행
        key={activeQuestionIndex}
        questionText={QUESTION[activeQuestionIndex].text}
        answers={QUESTION[activeQuestionIndex].answers}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
};

export default Quiz;
