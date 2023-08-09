import React, { useEffect, useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBSpinner,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import { fetchCategoryQuestions } from "../Redux/quizQuestionSlice";
import { fetchCategories } from "../Redux/categorySlice";
import { useDispatch, useSelector } from "react-redux";

////////////////Configuration de chargement des noms de catégories sur les tabs//////////
const CategoryQuestions = () => {
  const dispatch = useDispatch();
  const {
    data: categories,
    loading,
    error,
  } = useSelector((state) => state.categories);
  // Utilisation de useEffect pour charger les catégories dès que le composant est monté
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  ////////////////////Configuration MDB pour Tabs/////////////////
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const handleBasicClick = async (categoryId) => {
    if (categoryId === activeCategoryId) {
      setActiveCategoryId(null);
    } else {
      setActiveCategoryId(categoryId);
    }
    await dispatch(fetchCategoryQuestions(categoryId)); // Pour récupérer les questions de chaque catégorie
  };
  // Pour récupérer les questions de chaque catégorie
  const { questions } = useSelector((state) => state.quizQuestions);

  //////////////////////Rendering Loading and Error//////////////////////////////
  if (loading) {
    return (
      <div>
        <MDBSpinner color="primary">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </div>
    );
  }

  // Rendu conditionnel en cas d'erreur lors du chargement des données
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <MDBTabs className="mb-3">
        {categories.map((category) => (
          <MDBTabsItem key={category._id}>
            <MDBTabsLink
              onClick={() => handleBasicClick(category._id)}
              active={activeCategoryId === category._id}
              style={{
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {category.name}
            </MDBTabsLink>
          </MDBTabsItem>
        ))}
      </MDBTabs>

      {/* <MDBTabsContent>
        {categories.map((category) => (
          <MDBTabsPane
            key={category._id}
            show={activeCategoryId === category._id}
          >
            {questions?.map((question) => (
              <div key={question._id}>{question.question}</div>
            ))}
          </MDBTabsPane>
        ))}
      </MDBTabsContent> */}

      <MDBTabsContent>
        {categories.map((category) => (
          <MDBTabsPane
            key={category._id}
            show={activeCategoryId === category._id}
          >
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th>#</th>
                  <th>Questions</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {questions.map((question, index) => (
                  <tr key={question._id}>
                    <td>{index + 1}</td>
                    <td>{question.question}</td>
                    <td>
                      <MDBBtn color="primary" size="sm">
                        Update
                      </MDBBtn>
                    </td>
                    <td>
                      <MDBBtn color="danger" size="sm">
                        Delete
                      </MDBBtn>
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </MDBTabsPane>
        ))}
      </MDBTabsContent>
    </div>
  );
};

export default CategoryQuestions;
