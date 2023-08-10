import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  deleteCategory,
  updateCategory,
} from "../Redux/categorySlice";
import AddCategory from "./AddCategory";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBInput,
  MDBSpinner,
  MDBRipple,
} from "mdb-react-ui-kit";

const CategoryList = () => {
  const dispatch = useDispatch();
  const {
    data: categories,
    loading,
    error,
    deletedCategory,
  } = useSelector((state) => state.categories);

  // Utilisation de useEffect pour charger les catégories dès que le composant est monté
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, deletedCategory]);

  // Apporter le deletedCategory du fullfilled pour que ça fait du rerendering après la suppression de catégorie
  /*
Cela permet de forcer le re-render du composant CategoryList
après la suppression d'une catégorie, car le changement de deletedCategory dans le state déclenchera une mise à jour du composant.
Lorsque vous supprimez une catégorie, la valeur de deletedCategory dans le state doit être mise à jour
pour déclencher le re-render du composant CategoryList.
*/

  // État local pour suivre l'ID de la catégorie en cours d'édition et les nouvelles valeurs
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPhotoUrl, setEditPhotoUrl] = useState("");

  // Gestionnaire de suppression d'une catégorie
  const handleDelete = (categoryId) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
      dispatch(deleteCategory(categoryId));
    }
  };

  // Gestionnaire d'édition d'une catégorie
  const handleEdit = (category) => {
    // Mettre à jour l'état local avec les valeurs actuelles de la catégorie en cours d'édition

    // État pour suivre l'ID de la catégorie en cours d'édition
    setEditingCategory(category._id);

    // État pour suivre le nom de la catégorie en cours d'édition
    setEditName(category.name);

    // État pour suivre la description de la catégorie en cours d'édition
    setEditDescription(category.description);

    // État pour suivre l'URL de la photo de la catégorie en cours d'édition
    setEditPhotoUrl(category.photoUrl);
  };

  // Gestionnaire de sauvegarde des modifications
  const handleSave = () => {
    if (window.confirm("Voulez-vous sauvegarder les modifications ?")) {
      // Envoyer une requête pour mettre à jour la catégorie avec les nouvelles valeurs
      dispatch(
        updateCategory({
          id: editingCategory,
          name: editName,
          description: editDescription,
          photoUrl: editPhotoUrl, // Ajout de l'URL de la photo dans la requête
        })
      ).then(() => {
        // Mettre à jour la liste après la sauvegarde
        dispatch(fetchCategories());

        // Réinitialiser l'état local d'édition
        setEditingCategory(null);
        setEditName("");
        setEditDescription("");
        setEditPhotoUrl("");
      });
    }
  };

  // Gestionnaire d'annulation de l'édition
  const handleCancel = () => {
    // Annuler l'édition et réinitialiser l'état local d'édition comme déclaré au début dans les useState
    setEditingCategory(null);
    setEditName("");
    setEditDescription("");
    setEditPhotoUrl("");
  };

  // Rendu conditionnel en cas de chargement des données
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
      <AddCategory />
      <h2 style={{ marginBottom: "35px", textAlign: "center" }}>
        List of categories :
      </h2>
      <div className="row">
        {categories.map((category) => (
          <div key={category._id} className="col-md-4 mb-4">
            <MDBCard>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image hover-overlay"
              >
                {/* Afficher l'image de la catégorie avec les dimensions souhaitées */}
                <MDBCardImage
                  src={category.photoUrl}
                  fluid
                  alt="..."
                  style={{
                    height: "150px",
                    width: "300px",
                    objectFit: "cover",
                  }}
                />
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
              </MDBRipple>
              <MDBCardBody>
                {/* Afficher les champs de texte input lorsque la catégorie est en cours d'édition */}
                {editingCategory === category._id ? (
                  <>
                    <MDBInput
                      label="Category Name"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                    <MDBInput
                      label="Description"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    {/* Ajouter un champ pour l'URL de la photo */}
                    <MDBInput
                      label="Photo URL"
                      value={editPhotoUrl}
                      onChange={(e) => setEditPhotoUrl(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <MDBCardTitle>{category.name}</MDBCardTitle>
                    <MDBCardText>{category.description}</MDBCardText>
                  </>
                )}
                {/* Afficher les boutons "Sauvegarder" et "Annuler" lors de l'édition */}
                {editingCategory === category._id ? (
                  <>
                    <MDBBtn
                      color="success"
                      className="me-2"
                      onClick={handleSave}
                    >
                      Save
                    </MDBBtn>
                    <MDBBtn color="warning" onClick={handleCancel}>
                      Cancel
                    </MDBBtn>
                  </>
                ) : (
                  <>
                    <MDBBtn
                      color="danger"
                      className="me-2"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </MDBBtn>
                    <MDBBtn
                      color="primary"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </MDBBtn>
                  </>
                )}
              </MDBCardBody>
            </MDBCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
