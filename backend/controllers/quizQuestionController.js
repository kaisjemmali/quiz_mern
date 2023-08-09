const asyncHandler = require("express-async-handler");
const QuizQuestion = require("../models/quizQuestionModel");

// @desc    Créer une nouvelle question Quiz
// @route   POST /api/quiz-questions
// @access  Private (réservée à l'admin)
const createQuizQuestion = asyncHandler(async (req, res) => {
  const { question, options, category } = req.body;

  const quizQuestion = new QuizQuestion({
    question,
    options,
    category,
  });

  const createdQuestion = await quizQuestion.save();
  res.status(201).json(createdQuestion);
});

// @desc    Récupérer toutes les questions Quiz
// @route   GET /api/quiz-questions
// @access  Public
const getQuizQuestions = asyncHandler(async (req, res) => {
  const quizQuestions = await QuizQuestion.find().populate("category", "name");
  res.status(200).json(quizQuestions);
});

// @desc    Récupérer une question Quiz par son ID
// @route   GET /api/quiz-questions/:id
// @access  Public
const getQuizQuestionById = asyncHandler(async (req, res) => {
  const quizQuestion = await QuizQuestion.findById(req.params.id).populate(
    "category"
  );

  if (quizQuestion) {
    res.status(200).json(quizQuestion);
  } else {
    res.status(404);
    throw new Error("Question Quiz not found");
  }
});

// @desc    Récupérer les questions Quiz par catégorie
// @route   GET /api/quiz-questions/category/:categoryId
// @access  Public

const getQuizQuestionsByCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const quizQuestions = await QuizQuestion.find({
    category: id,
  });
  res.status(200).json(quizQuestions);
});

// @desc    Mettre à jour une question Quiz par son ID
// @route   PUT /api/quiz-questions/:id
// @access  Private (réservée à l'admin)
const updateQuizQuestion = asyncHandler(async (req, res) => {
  const { question, options, category } = req.body;

  const quizQuestion = await QuizQuestion.findById(req.params.id);

  if (quizQuestion) {
    quizQuestion.question = question;
    quizQuestion.options = options;
    quizQuestion.category = category;

    const updatedQuestion = await quizQuestion.save();
    res.status(200).json(updatedQuestion);
  } else {
    res.status(404);
    throw new Error("Question Quiz not found");
  }
});

// @desc    Supprimer une question Quiz par son ID
// @route   DELETE /api/quiz-questions/:id
// @access  Private (réservée à l'admin)
const deleteQuizQuestion = asyncHandler(async (req, res) => {
  const quizQuestion = await QuizQuestion.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Question Deleted" });
});

module.exports = {
  createQuizQuestion,
  getQuizQuestions,
  getQuizQuestionById,
  updateQuizQuestion,
  deleteQuizQuestion,
  getQuizQuestionsByCategory,
};
