import { useState } from "react";

import QUESTION from "../questions";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const handleSelectAnswer = (selectedAnswer) => {
    setUserAnswers((prevAnswer) => {
      return [...prevAnswer, selectedAnswer];
    });
  };

  return (
    <div id='quiz'>
      <div id='question'>
        <h2>{QUESTION[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {QUESTION[activeQuestionIndex].answers.map((answer) => (
            <li key={answer} className='answer'>
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
