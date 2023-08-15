// ////////////Modèle pour enregistrer en local storage////////////////////

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchCategoryQuestions } from "../Redux/quizQuestionSlice";
// import Result from "./Result";

// const QuizQuestions = ({ categoryId }) => {
//   const dispatch = useDispatch();
//   const { questions, loading, error } = useSelector(
//     (state) => state.quizQuestions
//   );

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
//   const [userResponses, setUserResponses] = useState([]); // Tableau pour stocker les réponses de l'utilisateur
//   const [showResult, setShowResult] = useState(false);

//   useEffect(() => {
//     dispatch(fetchCategoryQuestions(categoryId));
//   }, [dispatch, categoryId]);

//   const currentQuestion = questions[currentQuestionIndex];
//   const isLastQuestion = currentQuestionIndex === questions.length - 1;

//   const handleAnswerSelect = (answerIndex) => {
//     setSelectedAnswerIndex(answerIndex);
//   };

//   const handleNextQuestion = () => {
//     if (selectedAnswerIndex !== null) {
//       // Ajouter la réponse actuelle du joueur au tableau des réponses
//       const updatedUserResponses = [
//         ...userResponses,
//         {
//           questionId: currentQuestion.id,
//           selectedAnswerIndex,
//         },
//       ];
//       setUserResponses(updatedUserResponses);
//     }

//     setSelectedAnswerIndex(null);

//     if (isLastQuestion) {
//       setShowResult(true);
//     } else {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   return (
//     <div>
//       {loading ? (
//         <div>Chargement des questions...</div>
//       ) : error ? (
//         <div>Erreur lors du chargement des questions : {error}</div>
//       ) : showResult ? (
//         <Result userResponses={userResponses} questions={questions} />
//       ) : questions.length > 0 ? (
//         <div>
//           <h3>Question {currentQuestionIndex + 1}</h3>
//           <p>{currentQuestion.question}</p>
//           <div>
//             {currentQuestion.options.map((option, index) => (
//               <div key={index}>
//                 <label>
//                   <input
//                     type="radio"
//                     value={index}
//                     checked={selectedAnswerIndex === index}
//                     onChange={() => handleAnswerSelect(index)}
//                   />
//                   {option.text}
//                 </label>
//               </div>
//             ))}
//           </div>
//           <button
//             onClick={isLastQuestion ? handleNextQuestion : handleNextQuestion}
//             disabled={selectedAnswerIndex === null}
//           >
//             {isLastQuestion ? "Result" : "Next"}
//           </button>
//         </div>
//       ) : (
//         <p>Aucune question trouvée.</p>
//       )}
//     </div>
//   );
// };

// export default QuizQuestions;

/****************************************************************************/

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoryQuestions } from "../Redux/quizQuestionSlice";
import Result from "./Result";
import { createQuizResult } from "../Redux/quizResultSlice";
import { selectUserId } from "../Redux/authSlice";
import PlayQuiz from "./PlayQuiz";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import "./QuizQuestions.css";

const QuizQuestions = ({ categoryId }) => {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector(
    (state) => state.quizQuestions
  );
  const userId = useSelector(selectUserId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [userResponses, setUserResponses] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showQuizRePlay, setShowQuizRePlay] = useState(false);

  const toogleQuizRePlay = () => {
    // Implémentez la logique pour basculer vers le Replay
    setShowQuizRePlay((prevShowCategoryPlay) => !prevShowCategoryPlay);
  };

  useEffect(() => {
    dispatch(fetchCategoryQuestions(categoryId));
  }, [dispatch, categoryId]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  ///////////////////////////////////////////////////////
  // Au moment de passer les réponses à Result, filtrez les réponses pour inclure uniquement celles liées aux questions déjà posées.
  const userResponsesToShow = userResponses.slice(0, currentQuestionIndex + 1);
  ////////////////////////////////////////////////////////////////////////////////
  // Créer une liste de noms de questions à partir des questions
  const questionNames = questions.map((question) => question.questionText);
  //////////////////////////////////////////////////////////////////

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswerIndex(answerIndex);

    // Create a copy of the userResponses array
    const updatedResponses = [...userResponses];

    // Update the response for the current question
    updatedResponses[currentQuestionIndex] = {
      question: currentQuestion._id, // Ensure the 'question' property is set to the question ID
      selectedAnswerIndex: answerIndex,
      isCorrect: currentQuestion.options[answerIndex].isCorrect,
    };

    // Set the updated responses
    setUserResponses(updatedResponses);
  };

  const CALCULATE_SCORE = (responses) => {
    return responses.filter((response) => response.isCorrect).length * 5;
  };

  const handleNextQuestion = () => {
    if (selectedAnswerIndex !== null) {
      const updatedUserResponses = [
        ...userResponses,
        {
          question: currentQuestion._id,
          selectedAnswerIndex,
          isCorrect: currentQuestion.options[selectedAnswerIndex].isCorrect,
        },
      ];
      setUserResponses(updatedUserResponses);
      setSelectedAnswerIndex(null);
    } else {
      // Display an error message
      alert("Vous n'avez pas répondu à la question.");
    }

    setSelectedAnswerIndex(null);

    // Check if we are on the last question
    if (isLastQuestion) {
      // If this is the last question, create the quiz result
      const score = CALCULATE_SCORE(userResponses);

      const payload = {
        user: userId,
        questions: userResponses,
        score,
        categoryId,
      };

      dispatch(createQuizResult(payload));
      // Regardless of showResult, set it to true to display the result
      setShowResult(true);
    } else {
      // If there are more questions, move to the next question and reset showResult to false
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowResult(false);
    }
  };
  return (
    <div className="quiz-container">
      {loading ? (
        <div className="loading">Chargement des questions...</div>
      ) : error ? (
        <div className="error">
          Erreur lors du chargement des questions : {error}
        </div>
      ) : showResult ? (
        <Result
          userResponses={userResponsesToShow}
          questions={questions}
          questionNames={questionNames}
          toogleQuizRePlay={toogleQuizRePlay}
        />
      ) : questions.length > 0 ? (
        <div className="question-card">
          <div className="question-text">
            <h2>Question #{currentQuestionIndex + 1}</h2>
            <p>{currentQuestion.question}</p>
          </div>
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <MDBBtn
                key={index}
                color="primary"
                rounded
                value={index}
                checked={selectedAnswerIndex === index}
                onClick={() => handleAnswerSelect(index)}
                className={`option-btn ${
                  selectedAnswerIndex === index ? "selected" : ""
                }`}
              >
                {option.text}
              </MDBBtn>
            ))}
          </div>
          <div className="action">
            <button
              onClick={isLastQuestion ? handleNextQuestion : handleNextQuestion}
              disabled={selectedAnswerIndex === null}
              className={`next-btn ${isLastQuestion ? "result" : ""}`}
            >
              {isLastQuestion ? "Résultat" : "Suivant"}
              <MDBIcon
                fas
                icon={isLastQuestion ? "poll-h" : "angle-double-right"}
              />
            </button>
          </div>
        </div>
      ) : (
        <p>Aucune question trouvée.</p>
      )}
      {showQuizRePlay && <PlayQuiz />}
    </div>
  );
};

export default QuizQuestions;
