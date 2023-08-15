// ////////Modèle de base pour afficher les résultats avec local storage//////////////

// import React from "react";

// const Result = ({ userResponses, questions }) => {
//   // Initialiser le score à zéro
//   let score = 0;

//   return (
//     <div>
//       <h2>Résultat du quiz :</h2>
//       <ul>
//         {questions.map((question) => {
//           const response = userResponses.find(
//             (response) => response.questionId === question.id
//           );

//           let correctAnswerText; // Déclarer correctAnswerText en dehors du bloc if/else

//           if (response) {
//             const userAnswerText =
//               question.options[response.selectedAnswerIndex].text;

//             // Trouver l'index de la réponse correcte dans les options
//             const correctAnswerIndex = question.options.findIndex(
//               (option) => option.isCorrect
//             );
//             correctAnswerText = question.options[correctAnswerIndex].text;

//             // Comparer la réponse de l'utilisateur à la réponse correcte
//             const isCorrect = userAnswerText === correctAnswerText;

//             // Mettre à jour le score si la réponse est correcte
//             if (isCorrect) {
//               score += 5;
//             }

//             return (
//               <li key={question.id}>
//                 <p>Question : {question.question}</p>
//                 <p>Votre réponse : {userAnswerText}</p>
//                 <p>Réponse correcte : {correctAnswerText}</p>
//                 <p>Score pour cette question : {isCorrect ? 5 : 0}</p>
//               </li>
//             );
//           } else {
//             // Si l'utilisateur n'a pas répondu, le score reste le même pour cette question
//             return (
//               <li key={question.id}>
//                 <p>Question : {question.question}</p>
//                 <p>Votre réponse : Vous n'avez pas répondu à cette question</p>
//                 <p>Réponse correcte : {correctAnswerText}</p>
//                 <p>Score pour cette question : 0</p>
//               </li>
//             );
//           }
//         })}
//       </ul>
//       <p>Score total : {score}</p>
//     </div>
//   );
// };

// export default Result;

/*******************************************************************/

// Result.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuizResults } from "../Redux/quizResultSlice";
import { selectUserId } from "../Redux/authSlice";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

import "./Result.css"; // Import the CSS for styling

const Result = ({ userResponses, questions, toogleQuizRePlay }) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(fetchQuizResults(userId));
  }, [dispatch, userId]);

  const totalScore = userResponses.reduce(
    (score, response) => (response.isCorrect ? score + 5 : score),
    0
  );

  return (
    <div className="result-container">
      <div className="result-header">
        <h2>Quiz Result</h2>
      </div>

      <div className="result-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Your Answer</th>
              <th>Correct Answer</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => {
              const userResponse = userResponses[index];
              const selectedAnswerIndex = userResponse.selectedAnswerIndex;
              const isCorrect = userResponse.isCorrect;
              const correctAnswerIndex = question.options.findIndex(
                (option) => option.isCorrect
              );
              const correctAnswerText =
                question.options[correctAnswerIndex].text;
              const score = isCorrect ? 5 : 0;

              // Appliquer le style alternatif de ligne
              const isEvenRow = index % 2 === 0;
              const rowStyle = isEvenRow
                ? { backgroundColor: "#f2f2f2" } // Ligne en gris clair
                : { backgroundColor: "white" }; // Ligne en blanc

              return (
                <tr key={index} style={{ textAlign: "center", ...rowStyle }}>
                  <td>{index + 1}</td>
                  <td>{question.question}</td>
                  <td>
                    {selectedAnswerIndex !== null
                      ? question.options[selectedAnswerIndex].text
                      : "Vous n'avez pas répondu à cette question"}
                  </td>
                  <td>{correctAnswerText}</td>
                  <td
                    style={{
                      color:
                        score === 5 ? "green" : score === 0 ? "red" : "black",
                    }}
                  >
                    {score}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="total-score">
        <h4>Total Score: {totalScore}</h4>
      </div>

      <div className="buttons">
        <MDBBtn
          href="/user-dashboard"
          rounded
          color="danger"
          className="other-quiz-btn"
        >
          Other Quiz <MDBIcon fas icon="sign-out-alt" />
        </MDBBtn>

        <MDBBtn
          onClick={toogleQuizRePlay}
          rounded
          color="info"
          className="replay-quiz-btn"
        >
          Replay the Quiz <MDBIcon fas icon="redo" />
        </MDBBtn>
      </div>
    </div>
  );
};

export default Result;
