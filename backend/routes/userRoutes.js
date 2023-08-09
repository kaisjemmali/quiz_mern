const express = require("express");
const {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  banUser,
  unbanUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Route pour récupérer tous les users
router.get("/profiles", getUsers);

// Route pour supprimer un User par son ID
router.delete("/profile/:id", deleteUser);

// Nouvelle route pour bannir un utilisateur par son ID (réservée à l'Admin)
router.put("/ban/:id", banUser);
router.put("/unban/:id", unbanUser);

module.exports = router;
