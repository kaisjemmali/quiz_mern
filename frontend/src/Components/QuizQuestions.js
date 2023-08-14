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

/*********************************************************************************************************/

/////////////////////////////////************Fonctionnel*****************/////////////////////////////////

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchCategoryQuestions } from "../Redux/quizQuestionSlice";
// import Result from "./Result";
// import { createQuizResult } from "../Redux/quizResultSlice";
// import { selectUserId } from "../Redux/authSlice";

// const QuizQuestions = ({ categoryId }) => {
//   const dispatch = useDispatch();
//   const { questions, loading, error } = useSelector(
//     (state) => state.quizQuestions
//   );
//   const userId = useSelector(selectUserId);

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
//   const [userResponses, setUserResponses] = useState([]);
//   const [showResult, setShowResult] = useState(false);

//   useEffect(() => {
//     dispatch(fetchCategoryQuestions(categoryId));
//   }, [dispatch, categoryId]);

//   const currentQuestion = questions[currentQuestionIndex];
//   const isLastQuestion = currentQuestionIndex === questions.length - 1;

//   ///////////////////////////////////////////////////////
//   // Au moment de passer les réponses à Result, filtrez les réponses pour inclure uniquement celles liées aux questions déjà posées.
//   const userResponsesToShow = userResponses.slice(0, currentQuestionIndex + 1);
//   ////////////////////////////////////////////////////////////////////////////////

//   console.log("Is last question?", isLastQuestion);
//   //////////////////////////////////////////////////////////////
//   // Créer une liste de noms de questions à partir des questions
//   const questionNames = questions.map((question) => question.questionText);
//   //////////////////////////////////////////////////////////////////

//   const handleAnswerSelect = (answerIndex) => {
//     setSelectedAnswerIndex(answerIndex);

//     // Create a copy of the userResponses array
//     const updatedResponses = [...userResponses];

//     // Update the response for the current question
//     updatedResponses[currentQuestionIndex] = {
//       question: currentQuestion._id, // Ensure the 'question' property is set to the question ID
//       selectedAnswerIndex: answerIndex,
//       isCorrect: currentQuestion.options[answerIndex].isCorrect,
//     };

//     // Set the updated responses
//     setUserResponses(updatedResponses);
//   };

//   const CALCULATE_SCORE = (responses) => {
//     return responses.filter((response) => response.isCorrect).length * 5;
//   };

//   const handleNextQuestion = () => {
//     if (selectedAnswerIndex !== null) {
//       const updatedUserResponses = [
//         ...userResponses,
//         {
//           question: currentQuestion._id,
//           selectedAnswerIndex,
//           isCorrect: currentQuestion.options[selectedAnswerIndex].isCorrect,
//         },
//       ];
//       setUserResponses(updatedUserResponses);
//     } else {
//       // Display an error message
//       alert("Vous n'avez pas répondu à la question.");
//     }

//     setSelectedAnswerIndex(null);

//     // Check if we are on the last question
//     if (isLastQuestion) {
//       // If this is the last question, create the quiz result
//       const score = CALCULATE_SCORE(userResponses);

//       const payload = {
//         user: userId,
//         questions: userResponses,
//         score,
//         categoryId,
//       };

//       dispatch(createQuizResult(payload));
//       // Regardless of showResult, set it to true to display the result
//       setShowResult(true);
//     } else {
//       // If there are more questions, move to the next question and reset showResult to false
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setShowResult(false);
//     }
//   };

//   console.log("currentQuestion:", currentQuestion); // Add this line to log currentQuestion
//   console.log("userResponses:", userResponses); // Add this line to log userResponses

//   return (
//     <div>
//       {loading ? (
//         <div>Chargement des questions...</div>
//       ) : error ? (
//         <div>Erreur lors du chargement des questions : {error}</div>
//       ) : showResult ? (
//         // <Result userResponses={userResponses} questions={questions} />
//         <Result
//           // userResponses={userResponses}
//           userResponses={userResponsesToShow} // Passer les réponses filtrées comme prop
//           questions={questions}
//           questionNames={questionNames} // Passer la liste des noms de questions comme prop
//         />
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
//             {isLastQuestion ? "Résultat" : "Suivant"}
//           </button>
//         </div>
//       ) : (
//         <p>Aucune question trouvée.</p>
//       )}
//     </div>
//   );
// };

// export default QuizQuestions;

/////////////////////////////////*****************************/////////////////////////////////

/////////////////////Testé en dans le Quiz Repass (Fonctionnel Basique)////////////////////////

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchCategoryQuestions } from "../Redux/quizQuestionSlice";
// import Result from "./Result";
// import { createQuizResult } from "../Redux/quizResultSlice";
// import { selectUserId } from "../Redux/authSlice";
// import PlayQuiz from "./PlayQuiz";

// const QuizQuestions = ({ categoryId }) => {
//   const dispatch = useDispatch();
//   const { questions, loading, error } = useSelector(
//     (state) => state.quizQuestions
//   );
//   const userId = useSelector(selectUserId);

//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
//   const [userResponses, setUserResponses] = useState([]);
//   const [showResult, setShowResult] = useState(false);
//   const [showQuizRePlay, setShowQuizRePlay] = useState(false);

//   const toogleQuizRePlay = () => {
//     // Implémentez la logique pour basculer vers le Replay
//     setShowQuizRePlay((prevShowCategoryPlay) => !prevShowCategoryPlay);
//   };

//   useEffect(() => {
//     dispatch(fetchCategoryQuestions(categoryId));
//   }, [dispatch, categoryId]);

//   const currentQuestion = questions[currentQuestionIndex];
//   const isLastQuestion = currentQuestionIndex === questions.length - 1;

//   ///////////////////////////////////////////////////////
//   // Au moment de passer les réponses à Result, filtrez les réponses pour inclure uniquement celles liées aux questions déjà posées.
//   const userResponsesToShow = userResponses.slice(0, currentQuestionIndex + 1);
//   ////////////////////////////////////////////////////////////////////////////////
//   // Créer une liste de noms de questions à partir des questions
//   const questionNames = questions.map((question) => question.questionText);
//   //////////////////////////////////////////////////////////////////

//   const handleAnswerSelect = (answerIndex) => {
//     setSelectedAnswerIndex(answerIndex);

//     // Create a copy of the userResponses array
//     const updatedResponses = [...userResponses];

//     // Update the response for the current question
//     updatedResponses[currentQuestionIndex] = {
//       question: currentQuestion._id, // Ensure the 'question' property is set to the question ID
//       selectedAnswerIndex: answerIndex,
//       isCorrect: currentQuestion.options[answerIndex].isCorrect,
//     };

//     // Set the updated responses
//     setUserResponses(updatedResponses);
//   };

//   const CALCULATE_SCORE = (responses) => {
//     return responses.filter((response) => response.isCorrect).length * 5;
//   };

//   const handleNextQuestion = () => {
//     if (selectedAnswerIndex !== null) {
//       const updatedUserResponses = [
//         ...userResponses,
//         {
//           question: currentQuestion._id,
//           selectedAnswerIndex,
//           isCorrect: currentQuestion.options[selectedAnswerIndex].isCorrect,
//         },
//       ];
//       setUserResponses(updatedUserResponses);
//     } else {
//       // Display an error message
//       alert("Vous n'avez pas répondu à la question.");
//     }

//     setSelectedAnswerIndex(null);

//     // Check if we are on the last question
//     if (isLastQuestion) {
//       // If this is the last question, create the quiz result
//       const score = CALCULATE_SCORE(userResponses);

//       const payload = {
//         user: userId,
//         questions: userResponses,
//         score,
//         categoryId,
//       };

//       dispatch(createQuizResult(payload));
//       // Regardless of showResult, set it to true to display the result
//       setShowResult(true);
//     } else {
//       // If there are more questions, move to the next question and reset showResult to false
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setShowResult(false);
//     }
//   };

//   return (
//     <div>
//       {loading ? (
//         <div>Chargement des questions...</div>
//       ) : error ? (
//         <div>Erreur lors du chargement des questions : {error}</div>
//       ) : showResult ? (
//         // <Result userResponses={userResponses} questions={questions} />
//         <Result
//           // userResponses={userResponses}
//           userResponses={userResponsesToShow} // Passer les réponses filtrées comme prop
//           questions={questions}
//           questionNames={questionNames} // Passer la liste des noms de questions comme prop
//           toogleQuizRePlay={toogleQuizRePlay}
//         />
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
//             {isLastQuestion ? "Résultat" : "Suivant"}
//           </button>
//         </div>
//       ) : (
//         <p>Aucune question trouvée.</p>
//       )}
//       {showQuizRePlay && <PlayQuiz />}
//     </div>
//   );
// };

// export default QuizQuestions;

/////////////////////////////////*****************************/////////////////////////////////

//////////////////Test en dans le Quiz Repass (Fonctionnel avec Design)////////////////////////

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoryQuestions } from "../Redux/quizQuestionSlice";
import Result from "./Result";
import { createQuizResult } from "../Redux/quizResultSlice";
import { selectUserId } from "../Redux/authSlice";
import PlayQuiz from "./PlayQuiz";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

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
    <div>
      {loading ? (
        <div>Chargement des questions...</div>
      ) : error ? (
        <div>Erreur lors du chargement des questions : {error}</div>
      ) : showResult ? (
        // <Result userResponses={userResponses} questions={questions} />
        <Result
          // userResponses={userResponses}
          userResponses={userResponsesToShow} // Passer les réponses filtrées comme prop
          questions={questions}
          questionNames={questionNames} // Passer la liste des noms de questions comme prop
          toogleQuizRePlay={toogleQuizRePlay}
        />
      ) : questions.length > 0 ? (
        <div>
          <div
            style={{
              // textAlign: "center",
              display: "flex",
              flexDirection: "column",
              background: "#f2f2f2",
              borderRadius: "15px",
              padding: "20px",
              borderLeft: "6px solid #007bff",
              marginTop: "100px",
              marginBottom: "50px",
              width: "100%", // Largeur du cadre
            }}
          >
            <div
              style={{
                marginBottom: "50px",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <h2>Question #{currentQuestionIndex + 1}</h2>
            </div>
            <div style={{ marginBottom: "25px", marginLeft: "20px" }}>
              <h4>{currentQuestion.question}</h4>
            </div>
            <div>
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  style={{ display: "inline-block", width: "50%" }}
                >
                  <MDBBtn
                    color="primary"
                    rounded
                    value={index}
                    checked={selectedAnswerIndex === index}
                    onClick={() => handleAnswerSelect(index)}
                    style={{ width: "350px", margin: "15px" }}
                  >
                    {option.text}
                  </MDBBtn>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            <button
              onClick={isLastQuestion ? handleNextQuestion : handleNextQuestion}
              disabled={selectedAnswerIndex === null}
              style={{
                width: "150px",
                borderRadius: "10px",
                backgroundColor: isLastQuestion ? "red" : "green",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px 10px",
              }}
            >
              {isLastQuestion ? "Résultat" : "Suivant"}
              {isLastQuestion ? (
                <MDBIcon fas icon="poll-h" />
              ) : (
                <MDBIcon fas icon="angle-double-right" />
              )}
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

///////////////////Version amélioré avec Timer//////////////////////////////////
