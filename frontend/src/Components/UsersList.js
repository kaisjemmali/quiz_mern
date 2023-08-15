import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser, banUser, unbanUser } from "../Redux/userSlice";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, loading, error, deletedUser, updatedUser } = useSelector(
    (state) => state.userRd
  );

  // Utilisation de useEffect pour charger les utilisateurs dès que le composant est monté
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, deletedUser, updatedUser]);

  // Gestionnaire de suppression d'une catégorie
  const handleDelete = (userId) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
      dispatch(deleteUser(userId));
    }
  };

  // Gestionnaire pour bannir l'utilisateur
  const handleBan = (userId, isBanned) => {
    if (isBanned) {
      // Si l'utilisateur est déjà banni, le débannir
      dispatch(unbanUser(userId));
    } else {
      // Sinon, le bannir
      dispatch(banUser(userId));
    }
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
    // Vérifier si l'erreur est un objet
    const errorMessage = typeof error === "object" ? error.message : error;

    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h2 style={{ marginBottom: "35px", textAlign: "center" }}>
          List of users :
        </h2>
        {users.map((user) => (
          <div key={user._id} className="col-md-6 mt-5">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{
                        width: "130px",
                        height: "130px",
                        borderRadius: "10px",
                      }}
                      src={user.image}
                      alt="User Profile"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>{user.name}</MDBCardTitle>
                    <MDBCardText>{user.email}</MDBCardText>{" "}
                    {/* Ajouter l'e-mail de l'utilisateur */}
                    <MDBCardText>{user.role}</MDBCardText>
                    <div className="d-flex pt-1">
                      {/* Bouton pour bannir ou débannir l'utilisateur */}
                      <MDBBtn
                        outline
                        className="me-1 flex-grow-1"
                        style={{
                          backgroundColor: user.isBanned ? "green" : "red",
                          color: "white",
                        }}
                        onClick={() => handleBan(user._id, user.isBanned)}
                      >
                        {user.isBanned ? "Unban" : "Ban"}
                      </MDBBtn>
                      <MDBBtn
                        className="flex-grow-1"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </MDBBtn>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
