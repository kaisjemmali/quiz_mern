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
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import {
  fetchCategoryQuestions,
  deleteQuizQuestion,
  updateQuizQuestion,
} from "../Redux/quizQuestionSlice";
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
  const { questions, deletedQuestion } = useSelector(
    (state) => state.quizQuestions
  );

  /////////////////////Logique Modal && Edit Question //////////////////////////////

  const [basicModal, setBasicModal] = useState(false);

  // État local pour suivre l'ID de la question en cours d'édition et les nouvelles valeurs
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editCategory, setEditCategory] = useState("");
  const [editQuestion, setEditQuestion] = useState("");
  const [editOptions, setEditOptions] = useState([]);

  // Réinitialisation de l'état d'édition lorsque la modal est fermée
  useEffect(() => {
    if (!basicModal) {
      setEditingQuestion(null);
      setEditCategory("");
      setEditQuestion("");
      setEditOptions([]);
    }
  }, [basicModal]);

  const handleEdit = (quizQuestion) => {
    setBasicModal(!basicModal);
    ////// Mettre à jour l'état local avec les valeurs actuelles de la catégorie en cours d'édition//////

    // État pour suivre l'ID de la question en cours d'édition
    setEditCategory(quizQuestion.category); // Mettre à jour la catégorie actuelle
    setEditingQuestion(quizQuestion._id);
    setEditQuestion(quizQuestion.question);
    setEditOptions(quizQuestion.options);
  };

  // Gestionnaire de sauvegarde des modifications

  const handleSave = () => {
    if (window.confirm("Voulez-vous sauvegarder les modifications ?")) {
      // Envoyer une requête pour mettre à jour la question avec les nouvelles valeurs
      dispatch(
        updateQuizQuestion({
          id: editingQuestion,
          category: editCategory,
          question: editQuestion,
          options: editOptions,
        })
      ).then(() => {
        // Rechargez les questions pour la catégorie active
        dispatch(fetchCategoryQuestions(activeCategoryId));
        // Réinitialisez l'état local d'édition
        setEditingQuestion(null);
        setEditCategory("");
        setEditQuestion("");
        setEditOptions([]);
        setBasicModal(false); // Fermez le modal après avoir sauvegardé
      });
    }
  };

  // Gestionnaire d'annulation de l'édition

  const handleCancel = () => {
    // Annulez l'édition et réinitialisez l'état local d'édition
    setEditingQuestion(null);
    setEditCategory("");
    setEditQuestion("");
    setEditQuestion([]);
    setBasicModal(false); // Fermez le modal après avoir sauvegardé
  };

  // isCorrect Logique

  const handleCorrectOptionChange = (index) => {
    const updatedOptions = editOptions.map((option, i) => {
      if (i === index) {
        return { ...option, isCorrect: true };
      } else if (option.isCorrect) {
        // Ajouter cette condition pour réinitialiser l'option précédente correcte
        return { ...option, isCorrect: false };
      } else {
        return option;
      }
    });
    setEditOptions(updatedOptions);
  };

  // Ajouter une option avec un bouton

  const handleAddOption = () => {
    setEditOptions([...editOptions, { text: "", isCorrect: false }]);
  };

  // Supprimer une option avec un bouton

  const handleDeleteLastOption = () => {
    if (editOptions.length > 0) {
      const updatedOptions = [...editOptions];
      updatedOptions.pop(); // Supprime la dernière option
      setEditOptions(updatedOptions);
    }
  };

  //////////////Fin de la partie Edit//////////////////////////////////////////////////////////////

  // Utilisation de useEffect pour charger les catégories dès que le composant est monté
  useEffect(() => {
    dispatch(fetchCategories());
    // dispatch(fetchCategoryQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (deletedQuestion) {
      // Si une question a été supprimée, rechargez les questions
      dispatch(fetchCategoryQuestions(activeCategoryId)); // récupérer à nouveau les questions pour la catégorie active.
    }
  }, [dispatch, deletedQuestion, activeCategoryId]); // useEffect sera déclenché chaque fois que l'une de ces valeurs change

  const handleDelete = async (questionId) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette question ?")) {
      await dispatch(deleteQuizQuestion(questionId));
    }
  };

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
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {questions.map((question, index) => (
                  <tr key={question._id}>
                    <td>{index + 1}</td>
                    <td>{question.question}</td>
                    <td>
                      <MDBBtn
                        color="primary"
                        size="sm"
                        onClick={() => handleEdit(question)}
                      >
                        Edit
                      </MDBBtn>
                    </td>
                    <td>
                      <MDBBtn
                        color="danger"
                        size="sm"
                        onClick={() => handleDelete(question._id)}
                      >
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
      {/* Code du Modal MDB */}
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent left>
            <MDBModalHeader>
              <MDBModalTitle>Edit Question</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleCancel}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {/* ///////////////////Modal Content to Edit : Start////////////////// */}
              <MDBRow className="mb-3">
                <MDBCol>
                  <label htmlFor="category" className="form-label fw-bold mb-2">
                    Select Category
                  </label>
                  <select
                    className="form-select"
                    onChange={(e) => setEditCategory(e.target.value)}
                    value={editCategory} // Définir la valeur du champ sur editCategory
                  >
                    <option value="">Choose Category ...</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </MDBCol>
              </MDBRow>
              <label htmlFor="question" className="form-label fw-bold mb-3">
                Edit the Question
              </label>
              <MDBInput
                value={editQuestion}
                onChange={(e) => setEditQuestion(e.target.value)}
                className="mb-3"
              />

              {/* ///////////////////////Options///////////////////////////////////////////////////////////////////// */}
              <label htmlFor="options" className="form-label fw-bold mb-3">
                Edit Options :
              </label>
              {editOptions?.map((option, index) => (
                <div key={index}>
                  <label htmlFor="options" className="form-label fw-bold mb-3">
                    {`Option ${index + 1}`}
                  </label>
                  <MDBInput
                    type="text"
                    defaultValue={option.text}
                    onChange={(e) => {
                      const updatedText = e.target.value;
                      const updatedOptions = editOptions.map(
                        (opt, i) =>
                          i === index ? { ...opt, text: updatedText } : opt
                        // la valeur de retour doit ête un array
                        // onchange = {(e) => setEditOptions(e.target.value)}
                        // ne peut pas fonctionner car editOptions
                        // est un array, et setEditOptions qu'on veut retourner
                        // est une valeur simple et non pas un array
                      );
                      setEditOptions(updatedOptions);
                    }}
                    style={{ margin: "4px 0" }}
                  />
                  <div
                    className="d-flex align-items-center"
                    style={{ justifyContent: "space-around" }}
                  >
                    <div>
                      <input
                        type="radio"
                        id={`option${index}_correct`}
                        name={`correct_option_${index}`}
                        checked={option.isCorrect}
                        style={{ marginRight: "5px" }}
                        onChange={() => handleCorrectOptionChange(index)}
                      />
                      <label htmlFor={`option${index}_correct`}>
                        Correct Option
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id={`option${index}_incorrect`}
                        name={`correct_option_${index}`}
                        checked={!option.isCorrect}
                        style={{ marginRight: "5px" }}
                        onChange={() => handleCorrectOptionChange(index)}
                      />
                      <label htmlFor={`option${index}_incorrect`}>
                        Incorrect Option
                      </label>
                    </div>
                  </div>
                </div>
              ))}

              {/* ******* Ajouter un bouton pour ajouter une option supplémentaire */}

              <div className="d-grid gap-2 mt-3">
                <MDBBtn type="button" color="info" onClick={handleAddOption}>
                  Add Option
                </MDBBtn>
              </div>

              {/* Bouton pour supprimer la dernière option */}
              <div className="d-grid gap-2 mt-3">
                <MDBBtn
                  type="button"
                  color="danger"
                  onClick={handleDeleteLastOption}
                  disabled={editOptions.length === 0}
                >
                  Delete Option
                </MDBBtn>
              </div>

              {/* ///////////////////Modal Content to Edit : End////////////////// */}
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={handleCancel}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSave}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default CategoryQuestions;
