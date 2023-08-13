const asyncHandler = require("express-async-handler");
const QuizResult = require("../models/quizResultModel");

/////////////////////////////

exports.createQuizResult = asyncHandler(async (req, res) => {
  // Récupérer les données du résultat de la requête
  const { user, questions, score, categoryId } = req.body;

  // ... autres traitements

  // Enregistrer le QuizResult dans la base de données
  const newQuizResult = new QuizResult({
    user,
    questions,
    score,
    categoryId, // Assurez-vous de bien inclure l'ID de la catégorie
  });

  // Enregistrez le nouveau QuizResult dans la base de données
  const savedQuizResult = await newQuizResult.save();

  // Répondez à la requête avec les détails du QuizResult enregistré
  res.status(201).json(savedQuizResult);
});

/////////////////////////////

// Obtenir les résultats d'un quiz pour un utilisateur donné
exports.getQuizResultsForUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  // Récupérer les résultats de quiz pour l'utilisateur donné
  const quizResults = await QuizResult.find({ user: userId });

  res.status(200).json(quizResults);
});
