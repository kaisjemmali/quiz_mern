const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
//@desc Register new user
//route POST /api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    image,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

//@desc Authuser
//route POST /api/users/auth
//@access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchedPassword(password))) {
    if (user.isBanned) {
      res.status(403);
      throw new Error(
        "You are banned by the Admin. Please contact support for more information."
      );
    }
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Logout User
//route POST /api/users/logout
//@access Public

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

//@desc  UserProfile
//route GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    image: req.user.image,
  };

  res.status(200).json({ user });
});

//@desc Update User
//route PUT /api/users/profile
//@access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.image = req.body.image || user.image;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    Récupérer tous les users
// @route   GET /api/users/profiles/
// @access  Private (car ce sera l'admin qui va faire le get users)
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Supprimer un User par son ID
// @route   DELETE /api/users/profile/:id
// @access  Private (car ce sera l'admin qui va supprimer les users)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "User Deleted" });
});

//@desc Ban a user by ID
// @route   PUT /api/users/ban/:id
// @access  Private (since only Admin can ban a user)
const banUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Set the isBanned field to true to ban the user
    user.isBanned = true;
    await user.save();

    res.status(200).json({ message: "User has been banned successfully" });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to ban the user");
  }
});

//@desc Unban a user by ID
// @route   PUT /api/users/unban/:id
// @access  Private (since only Admin can unban a user)

const unbanUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Set the isBanned field to false to unban the user
    user.isBanned = false;
    await user.save();

    res.status(200).json({ message: "User has been unbanned successfully" });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to unban the user");
  }
});

module.exports = {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  banUser,
  unbanUser,
};
