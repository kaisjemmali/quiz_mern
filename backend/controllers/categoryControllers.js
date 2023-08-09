const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

// @desc    Créer une nouvelle catégorie
// @route   POST /api/categories
// @access  Private (car ce sera l'admin qui va créer les catégories)
/////////////////////////////////////////////////////////////

const createCategory = asyncHandler(async (req, res) => {
  const { name, description, photoUrl } = req.body; // Inclure le champ photoUrl dans les données reçues

  const category = new Category({ name, description, photoUrl }); // Utiliser photoUrl pour créer une nouvelle catégorie
  const savedCategory = await category.save();

  res.status(201).json(savedCategory);
});

// @desc    Récupérer toutes les catégories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// @desc    Récupérer une seule catégorie par son ID
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Category Not found");
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name, description, photoUrl } = req.body; // Inclure le champ photoUrl dans les données reçues

  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name || category.name;
    category.description = description || category.description;
    category.photoUrl = photoUrl || category.photoUrl; // Mettre à jour l'URL de la photo si fournie

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category Not found");
  }
});

// @desc    Supprimer une catégorie par son ID
// @route   DELETE /api/categories/:id
// @access  Private (car ce sera l'admin qui va supprimer les catégories)
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Category Deleted" });
});

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
