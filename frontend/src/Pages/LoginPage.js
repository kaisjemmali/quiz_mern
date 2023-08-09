import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/userSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Dispatch de l'action de connexion pour obtenir les informations de l'utilisateur
      await dispatch(login({ formValue, toast }));

      // Récupération des informations de l'utilisateur depuis le localStorage
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      // Vérification si l'utilisateur est un administrateur (isAdmin)
      if (userInfo.isAdmin) {
        // Rediriger vers la page d'administration
        navigate("/admin-dashboard");
      } else {
        // Rediriger vers la page utilisateur
        navigate("/user-dashboard");
      }
    } catch (error) {
      // Gérer les erreurs ici (par exemple, afficher un message d'erreur)
    }
  };
  // Fonction pour gérer le clic sur "Forgot password?"
  const handleForgotPasswordClick = (e) => {
    e.preventDefault(); // Empêche la redirection par défaut du lien
    // Afficher l'alerte avec le message "Relax and try to remember ;)"
    alert("Relax and try to remember ;)");
  };
  return (
    <Form onSubmit={submitHandler}>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample"
            />
          </MDBCol>

          <MDBCol col="4" md="6">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="lead fw-normal mb-0 me-3">Sign in with</p>

              <MDBBtn floating size="md" tag="a" className="me-2">
                <MDBIcon fab icon="facebook-f" />
              </MDBBtn>

              <MDBBtn floating size="md" tag="a" className="me-2">
                <MDBIcon fab icon="twitter" />
              </MDBBtn>

              <MDBBtn floating size="md" tag="a" className="me-2">
                <MDBIcon fab icon="linkedin-in" />
              </MDBBtn>
            </div>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>

            <MDBInput
              wrapperClass="mb-4"
              onChange={changeHandler}
              type="email"
              placeholder="Enter Email"
              name="email"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              onChange={changeHandler}
              type="password"
              placeholder="Enter your password"
              name="password"
              size="lg"
            />

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#" onClick={handleForgotPasswordClick}>
                Forgot password?
              </a>
            </div>

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn className="mb-0 px-5" size="lg">
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <a href="#!" className="link-danger">
                  <Link to="/register">Register</Link>
                </a>
              </p>
            </div>
          </MDBCol>
        </MDBRow>

        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          <div className="text-white mb-3 mb-md-0">
            {/* Make the current year in the footer */}
            Copyright © {new Date().getFullYear()}. All rights reserved.
          </div>

          <div>
            <MDBBtn
              tag="a"
              color="none"
              className="mx-3"
              style={{ color: "white" }}
            >
              <MDBIcon fab icon="facebook-f" size="md" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="mx-3"
              style={{ color: "white" }}
            >
              <MDBIcon fab icon="twitter" size="md" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="mx-3"
              style={{ color: "white" }}
            >
              <MDBIcon fab icon="google" size="md" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="mx-3"
              style={{ color: "white" }}
            >
              <MDBIcon fab icon="linkedin-in" size="md" />
            </MDBBtn>
          </div>
        </div>
      </MDBContainer>
    </Form>
  );
};

export default LoginPage;
