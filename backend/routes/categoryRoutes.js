const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getQuizQuestionsByCategory,
} = require("../controllers/categoryControllers");
// const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route pour récupérer toutes les catégories
router.get("/", getCategories);

// Route pour récupérer une catégorie par son ID
router.get("/:id", getCategoryById);

// Route pour créer une nouvelle catégorie
router.post("/", createCategory);

// Route pour mettre à jour une catégorie par son ID
router.put("/:id", updateCategory);

// Route pour supprimer une catégorie par son ID
router.delete("/:id", deleteCategory);

// Route pour supprimer une catégorie par son ID

module.exports = router;
