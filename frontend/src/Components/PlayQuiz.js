/******************************Fonctionnel******************************/

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../Redux/categorySlice";
import QuizQuestions from "./QuizQuestions";
import {
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBSpinner,
} from "mdb-react-ui-kit";

const PlayQuiz = () => {
  const dispatch = useDispatch();
  const {
    data: categories,
    loading,
    error,
  } = useSelector((state) => state.categories);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategorySelect = (categoryId) => {
    // Mettez à jour l'ID de la catégorie sélectionnée dans l'état local
    setSelectedCategoryId(categoryId);
  };

  // Utilisation de useEffect pour charger les catégories dès que le composant est monté
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  if (loading) {
    return (
      <div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <MDBSpinner color="primary">
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        </div>
      </div>
    );
  }

  // Rendu conditionnel en cas d'erreur lors du chargement des données
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Si une catégorie a été sélectionnée, affichez uniquement les questions
  if (selectedCategoryId !== null) {
    return <QuizQuestions categoryId={selectedCategoryId} />;
  }

  return (
    <div>
      <h2 style={{ marginBottom: "35px", textAlign: "center" }}>
        Select a Category to Play Quiz :
      </h2>
      {/* Utilisation du composant MDBTable pour afficher les catégories sous forme de tableau */}
      <MDBTable align="middle">
        <MDBTableHead>
          <tr style={{ background: "#f0f0f0" }}>
            <th scope="col"></th>
            <th scope="col" style={{ fontWeight: "bold" }}>
              Name
            </th>
            <th scope="col" style={{ fontWeight: "bold" }}>
              Description
            </th>
            <th scope="col" style={{ fontWeight: "bold" }}>
              Actions
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={category.photoUrl}
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                </div>
              </td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                {/* Ajoutez ici la logique pour permettre à l'utilisateur de choisir une catégorie */}
                <MDBBtn
                  color="primary"
                  size="sm" /* ... Ajoutez la logique de sélection de la catégorie ... */
                  style={{ width: "180px", height: "35px" }}
                  onClick={() => handleCategorySelect(category._id)}
                >
                  Play {category.name} Quiz
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      {/* Afficher le composant QuizQuestions si une catégorie est sélectionnée */}
      {selectedCategoryId !== null && (
        <QuizQuestions categoryId={selectedCategoryId} />
      )}
    </div>
  );
};

export default PlayQuiz;
