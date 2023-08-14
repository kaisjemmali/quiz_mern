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

// import React from "react";

// const Result = ({ userResponses, questions }) => {
//   let score = 0;

//   return (
//     <div>
//       <h2>Résultat du quiz :</h2>
//       <ul>
//         {questions.map((question) => {
//           const response = userResponses.find(
//             (response) => response.questionId === question.id
//           );

//           if (response) {
//             const userAnswerText =
//               question.options[response.selectedAnswerIndex].text;

//             const correctAnswerIndex = question.options.findIndex(
//               (option) => option.isCorrect
//             );
//             const correctAnswerText = question.options[correctAnswerIndex].text;

//             const isCorrect = userAnswerText === correctAnswerText;

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
//             return (
//               <li key={question.id}>
//                 <p>Question : {question.question}</p>
//                 <p>Votre réponse : Vous n'avez pas répondu à cette question</p>
//                 <p>
//                   Réponse correcte : {/* You can handle this part if needed */}
//                 </p>
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

//////////////////////////////////////////////////

// import React from "react";

// const Result = ({ userResponses, questions }) => {
//   let score = 0;

//   return (
//     <div>
//       <h2>Résultat du quiz :</h2>
//       <ul>
//         {questions.map((question) => {
//           const response = userResponses.find(
//             (response) => response.questionId === question._id
//           );

//           if (response) {
//             const userAnswerText =
//               question.options[response.selectedAnswerIndex].text;

//             const correctAnswerIndex = question.options.findIndex(
//               (option) => option.isCorrect
//             );
//             const correctAnswerText = question.options[correctAnswerIndex].text;

//             const isCorrect = userAnswerText === correctAnswerText;

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
//             return (
//               <li key={`no-response-${question.id}`}>
//                 <p>Question : {question.question}</p>
//                 <p>Votre réponse : Vous n'avez pas répondu à cette question</p>
//                 <p>
//                   Réponse correcte :{" "}
//                   {/* Vous pouvez gérer cette partie si nécessaire */}
//                 </p>
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

// import React from "react";

// const Result = ({ userResponses, questions }) => {
//   // Calculate the total score
//   const totalScore =
//     userResponses.filter((response) => response.isCorrect).length * 5;

//   return (
//     <div>
//       <h2>Résultat du quiz :</h2>
//       {questions.map((question, index) => (
//         <div key={index}>
//           <h3>Question : {question.question}</h3>
//           <p>
//             Votre réponse :{" "}
//             {userResponses[index].selectedAnswerIndex !== null
//               ? question.options[userResponses[index].selectedAnswerIndex].text
//               : "Vous n'avez pas répondu à cette question"}
//           </p>
//           <p>
//             Réponse correcte :{" "}
//             {question.options.find((option) => option.isCorrect)?.text}
//           </p>
//           <p>
//             Score pour cette question : {userResponses[index].isCorrect ? 5 : 0}
//           </p>
//         </div>
//       ))}
//       <p>Score total : {totalScore}</p>
//     </div>
//   );
// };

// export default Result;

// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchQuizResults } from "../Redux/quizResultSlice";

// const Result = ({ questions }) => {
//   const dispatch = useDispatch();
//   const userId = useSelector((state) => state.auth.userId);

//   useEffect(() => {
//     dispatch(fetchQuizResults(userId));
//   }, [dispatch, userId]);

//   const quizResults = useSelector((state) => state.quizResult.data);

//   // Calcul du score total
//   const totalScore = quizResults.reduce((acc, result) => {
//     return acc + result.score;
//   }, 0);

//   return (
//     <div>
//       <h2>Résultat du quiz :</h2>
//       {questions.map((question, index) => (
//         <div key={index}>
//           <h3>Question : {question.question}</h3>
//           <p>
//             Votre réponse :{" "}
//             {quizResults[index]?.questions[index]?.selectedAnswerIndex !== null
//               ? question.options[
//                   quizResults[index].questions[index].selectedAnswerIndex
//                 ].text
//               : "Vous n'avez pas répondu à cette question"}
//           </p>
//           <p>
//             Réponse correcte :{" "}
//             {question.options.find((option) => option.isCorrect)?.text}
//           </p>
//           <p>Score pour cette question : {quizResults[index]?.score || 0}</p>
//         </div>
//       ))}
//       <p>Score total : {totalScore}</p>
//     </div>
//   );
// };

// export default Result;

/////////***************//////////////////////////

// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchQuizResults } from "../Redux/quizResultSlice";
// import { selectUserId } from "../Redux/authSlice"; // Import the selectUserId selector

// const Result = ({ userResponses, questions }) => {
//   const dispatch = useDispatch();
//   const userId = useSelector(selectUserId);

//   useEffect(() => {
//     dispatch(fetchQuizResults(userId));
//   }, [dispatch, userId]);

//   // Calcul du score total
//   const totalScore =
//     userResponses.filter((response) => response.isCorrect).length * 5;

//   return (
//     <div>
//       <h2>Résultat du quiz :</h2>
//       {questions.map((question, index) => {
//         const userResponse = userResponses[index];
//         const selectedAnswerIndex = userResponse.selectedAnswerIndex;
//         const isCorrect = userResponse.isCorrect;
//         const correctAnswerIndex = question.options.findIndex(
//           (option) => option.isCorrect
//         );
//         const correctAnswerText = question.options[correctAnswerIndex].text;

//         return (
//           <div key={index}>
//             <h3>Question : {question.question}</h3>
//             <p>
//               Votre réponse :{" "}
//               {selectedAnswerIndex !== null
//                 ? question.options[selectedAnswerIndex].text
//                 : "Vous n'avez pas répondu à cette question"}
//             </p>
//             <p>Réponse correcte : {correctAnswerText}</p>
//             <p>Score pour cette question : {isCorrect ? 5 : 0}</p>
//           </div>
//         );
//       })}
//       <p>Score total : {totalScore}</p>
//     </div>
//   );
// };

// export default Result;

////////////***************Fonctionnel*************////////////////////////////////////

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuizResults } from "../Redux/quizResultSlice";
import { selectUserId } from "../Redux/authSlice"; // Import the selectUserId selector
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

const Result = ({ userResponses, questions, toogleQuizRePlay }) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(fetchQuizResults(userId));
  }, [dispatch, userId]);

  // Calcul du score total
  const totalScore = userResponses.reduce(
    (score, response) => (response.isCorrect ? score + 5 : score),
    0
  );

  return (
    <div>
      <div
        style={{
          marginBottom: "50px",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <h2>Quiz Result</h2>
      </div>

      <div>
        <table style={{ width: "900px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "center", width: "5%" }}>#</th>
              <th style={{ textAlign: "center", width: "50%" }}>Question</th>
              <th style={{ textAlign: "center", width: "17%" }}>Your Answer</th>
              <th style={{ textAlign: "center", width: "17%" }}>
                Correct Answer
              </th>
              <th style={{ textAlign: "center", width: "11%" }}>Score</th>
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
      <div
        style={{
          marginBottom: "50px",
          textAlign: "end",
          marginTop: "30px",
          color: "blue",
        }}
      >
        <h4>Score total : {totalScore}</h4>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <MDBBtn
          href="/user-dashboard"
          rounded
          color="danger"
          style={{
            width: "230px",
            marginRight: "30px",
            fontSize: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Other Quiz
          <MDBIcon fas icon="sign-out-alt" />
        </MDBBtn>

        <MDBBtn
          onClick={toogleQuizRePlay}
          rounded
          color="info"
          style={{
            width: "230px",
            fontSize: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Replay the Quiz
          <MDBIcon fas icon="redo" />
        </MDBBtn>
      </div>
    </div>
  );
};

export default Result;

/*************************Code à tester en caontainer*********************/
