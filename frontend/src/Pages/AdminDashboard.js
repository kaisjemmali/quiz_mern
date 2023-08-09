import React, { useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import ProfilePage from "./ProfilePage";
import CategoryList from "../Components/CategoryList"; // Import the CategoryList component
import UsersList from "../Components/UsersList"; // Import the UsersList component
import AddQuestion from "../Components/AddQuestion";
import { useSelector } from "react-redux"; // Import useSelector from react-redux to access Redux state
import "./dashboard.css";
import CategoryQuestions from "../Components/CategoryQuestions";

const AdminDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showUsers, setShowUsers] = useState(false); // State for showing UsersList
  const [showAddQuestion, setShowAddQuestion] = useState(false); // State for showing AddQuestion form
  const [showCategoryQuestion, setCategoryAddQuestion] = useState(false); // State for showing AddQuestion form

  const categories = useSelector((state) => state.categories.data); // Access categories data from Redux state

  const toggleProfile = () => {
    setShowProfile((prevShowProfile) => !prevShowProfile);
    setShowCategories(false);
    setShowUsers(false); // Hide UsersList when toggling Profile
    setShowAddQuestion(false); // Hide AddQuestion form when toggling Profile
    setCategoryAddQuestion(false);
  };

  const toggleCategories = () => {
    setShowCategories((prevShowCategories) => !prevShowCategories);
    setShowProfile(false);
    setShowUsers(false); // Hide UsersList when toggling Categorie
    setShowAddQuestion(false); // Hide AddQuestion form when toggling Categories
    setCategoryAddQuestion(false);
  };

  // Function to toggle UsersList and hide Profile and Categories
  const toggleUsers = () => {
    setShowUsers((prevShowUsers) => !prevShowUsers);
    setShowProfile(false);
    setShowCategories(false);
    setShowAddQuestion(false); // Hide AddQuestion form when toggling UsersList
    setCategoryAddQuestion(false);
  };

  // Function to toggle AddQuestion and hide Profile and Categories and Users

  const toggleAddQuestion = () => {
    setShowAddQuestion((prevShowAddQuestion) => !prevShowAddQuestion);
    setShowProfile(false);
    setShowCategories(false);
    setShowUsers(false);
    setCategoryAddQuestion(false);
  };

  // Function to toggle CategoryQuestion and hide Profile and Categories and Users

  const toggleCategoryQuestions = () => {
    setCategoryAddQuestion(
      (prevshowCategoryQuestion) => !prevshowCategoryQuestion
    );
    setShowAddQuestion(false);
    setShowProfile(false);
    setShowCategories(false);
    setShowUsers(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "0 0 25%", maxWidth: "30%" }}>
        <Sidebar
          toggleProfile={toggleProfile}
          toggleCategories={toggleCategories}
          toggleUsers={toggleUsers}
          toggleAddQuestion={toggleAddQuestion}
          toggleCategoryQuestions={toggleCategoryQuestions}
        />
      </div>

      <div style={{ flex: "1", maxWidth: "70%", marginLeft: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {showProfile && <ProfilePage />}
          {/* Render CategoryList component if showCategories is true */}
          {showCategories && <CategoryList categories={categories} />}
          {/* Render UsersList component if showUsers is true */}
          {showUsers && <UsersList />}
          {showAddQuestion && <AddQuestion />}
          {showCategoryQuestion && <CategoryQuestions />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
