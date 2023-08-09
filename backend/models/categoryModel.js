const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String, // Le champ pour stocker l'URL de la photo
    default: "", // Vous pouvez définir une URL par défaut si nécessaire
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
