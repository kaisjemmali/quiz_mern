import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../Redux/categorySlice";
import { fetchCategories } from "../Redux/categorySlice";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";

const AddCategory = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState(""); // Ajout de l'état pour l'URL de la photo
  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePhotoUrlChange = (e) => {
    setPhotoUrl(e.target.value);
  };

  const addHandler = (e) => {
    e.preventDefault();
    dispatch(createCategory({ name: title, description, photoUrl })).then(
      () => {
        dispatch(fetchCategories()); // Mettez à jour la liste après l'ajout de la catégorie
      }
    );
    setTitle(""); // Réinitialisez le titre, la description et l'URL de la photo après l'ajout
    setDescription("");
    setPhotoUrl("");
  };

  return (
    <div style={{ marginTop: "50px", marginBottom: "40px" }}>
      <form onSubmit={addHandler}>
        <MDBRow className="mb-4">
          <MDBCol size="6">
            <MDBInput
              label="Category Name"
              value={title}
              onChange={handleTitleChange} // Utilisez le handler spécifique pour le champ de name
            />
          </MDBCol>
          <MDBCol size="6">
            <MDBInput
              label="Description"
              value={description}
              onChange={handleDescriptionChange} // Utilisez le handler spécifique pour le champ de description
            />
          </MDBCol>
        </MDBRow>
        <MDBInput
          label="Photo URL" // Champ pour entrer l'URL de la photo
          value={photoUrl}
          onChange={handlePhotoUrlChange} // Utilisez le handler spécifique pour l'URL de la photo
        />
        <div className="text-center">
          {" "}
          {/* Utilisation de la classe CSS text-center pour centrer le bouton */}
          <MDBBtn type="submit" style={{ marginTop: "15px" }}>
            Add Category
          </MDBBtn>
        </div>{" "}
      </form>
    </div>
  );
};

export default AddCategory;
