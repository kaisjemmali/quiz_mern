const express = require("express");
const router = express.Router();

const {
  createQuizQuestion,
  getQuizQuestions,
  getQuizQuestionById,
  updateQuizQuestion,
  deleteQuizQuestion,
  getQuizQuestionsByCategory,
} = require("../controllers/quizQuestionController");

// Route pour créer une nouvelle question Quiz
router.post("/", createQuizQuestion);

// Route pour récupérer toutes les questions Quiz
router.get("/", getQuizQuestions);

// Route pour récupérer une question Quiz par son ID
router.get("/:id", getQuizQuestionById);

// Route pour mettre à jour une question Quiz par son ID
router.put("/:id", updateQuizQuestion);

// Route pour supprimer une question Quiz par son ID
router.delete("/:id", deleteQuizQuestion);

// Route pour récupérer toutes les questions par catégorie

router.get("/category/:id", getQuizQuestionsByCategory);

module.exports = router;
