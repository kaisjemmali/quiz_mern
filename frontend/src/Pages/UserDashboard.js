/***********************Fonctionnel****************************/

import React, { useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import PlayQuiz from "../Components/PlayQuiz"; // Import the PlayQuiz Categories
import ProfilePage from "./ProfilePage";
import "./dashboard.css";

const UserDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showCategoryPlay, setShowCategoryPlay] = useState(false);

  const toggleProfile = () => {
    setShowProfile((prevShowProfile) => !prevShowProfile);
    setShowCategoryPlay(false);
  };

  const toogleCategoryPlay = () => {
    setShowCategoryPlay((prevShowCategoryPlay) => !prevShowCategoryPlay);
    setShowProfile(false);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={{ flex: "0 0 30%", maxWidth: "30%" }}>
        <Sidebar
          toggleProfile={toggleProfile}
          toogleCategoryPlay={toogleCategoryPlay}
        />
      </div>

      {/* Main Content */}
      <div style={{ flex: "1", maxWidth: "70%", marginLeft: "20px" }}>
        {/* Center the content if needed */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {showProfile && <ProfilePage />}
          {/* Add other content based on selectedItem */}
          {showCategoryPlay && <PlayQuiz />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

/*
flex: "0 0 30%" : Cela définit les propriétés flex de la div. Dans ce cas, la div a les propriétés flex suivantes :

flex-grow : 0 - Cela signifie que la div ne s'étendra pas pour occuper un espace supplémentaire dans le conteneur flex s'il est disponible.
flex-shrink : 0 - Cela signifie que la div ne rétrécira pas lorsqu'il n'y a pas suffisamment d'espace dans le conteneur flex.
flex-basis : 30% - Cela définit la taille initiale de la div à 30 % de l'espace disponible dans le conteneur flex.

*/
