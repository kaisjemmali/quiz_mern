const express = require("express");
const router = express.Router();
const {
  createQuizResult,
  getQuizResultsForUser,
} = require("../controllers/quizResultController");

// Route pour créer un nouveau résultat de quiz
router.post("/user/save", createQuizResult);

// Route pour obtenir les résultats de quiz pour un utilisateur donné
router.get("/user/:userId", getQuizResultsForUser);

module.exports = router;
