/*******************************Fonctionnel****************************/
import React, { useEffect, useRef } from "react";
import "./Sidebar.css";
import {
  MDBIcon,
  MDBCollapse,
  MDBRipple,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../Redux/authSlice";

export default function App({
  toggleProfile,
  toggleCategories,
  toggleUsers,
  toggleAddQuestion,
  toggleCategoryQuestions,
  toogleCategoryPlay,
}) {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playQuizItemRef = useRef(null); // Référence à l'élément "Play Quiz"  *******

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(Logout());
    navigate("/login");
  };

  useEffect(() => {
    // Simuler un clic sur "Play Quiz" au chargement de la page
    if (playQuizItemRef.current) {
      playQuizItemRef.current.click();
    }
  }, []);

  return (
    <>
      <MDBCollapse
        // show={showShow}
        tag="nav"
        className="d-lg-block bg-white sidebar"
      >
        <div className="position-sticky">
          <MDBListGroup flush className="mx-3 mt-4">
            <img
              src={userInfo.image}
              alt="user-pic"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "15px",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "10px",
                borderColor: "blue",
                borderStyle: "double",
              }}
            />
            <MDBRipple rippleTag="span"></MDBRipple>
            <h5
              style={{
                marginTop: "10px",
                paddingLeft: "5px",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "10px",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              {userInfo.name}
            </h5>
            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                href="#"
                action
                className="border-0 border-bottom rounded rounded"
              >
                <MDBIcon fas icon="tachometer-alt me-3" />
                Main Dashboard
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                href="/"
                action
                className="border-0 border-bottom rounded rounded"
              >
                <MDBIcon fas icon="fas fa-house me-3" />
                Home Page
              </MDBListGroupItem>
            </MDBRipple>

            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                href="#"
                action
                className="border-0 border-bottom rounded"
                aria-current="true"
                onClick={toggleProfile} // Utilisation de la fonction toggleProfile
              >
                <MDBIcon fas icon="chart-area me-3" />
                Profile
              </MDBListGroupItem>
            </MDBRipple>
            {userInfo.isAdmin ? (
              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 border-bottom rounded"
                  onClick={toggleCategories} // Utilisation de la fonction toggleCategories
                >
                  <MDBIcon fas icon="fas fa-folder-plus me-3" />
                  Categories
                </MDBListGroupItem>
              </MDBRipple>
            ) : (
              ""
            )}
            {userInfo.isAdmin ? (
              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 border-bottom rounded"
                  onClick={toggleAddQuestion} // Utilisation de la fonction toggleCategories
                >
                  <MDBIcon fas icon="chart-line me-3" />
                  Add Quiz
                </MDBListGroupItem>
              </MDBRipple>
            ) : (
              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  active
                  className="border-0 border-bottom rounded"
                  onClick={toogleCategoryPlay} // Utilisation de la fonction toogleCategoryPlay
                  ref={playQuizItemRef} // Ajouter la référence à l'élément "Play Quiz"
                >
                  <MDBIcon fas icon="fas fa-gamepad me-3" />
                  Play Quiz
                </MDBListGroupItem>
              </MDBRipple>
            )}
            {userInfo.isAdmin ? (
              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 border-bottom rounded"
                  onClick={toggleCategoryQuestions} // Utilisation de la fonction toggleCategoryQuestions
                >
                  <MDBIcon fas icon="chart-pie me-3" />
                  Show Quiz
                </MDBListGroupItem>
              </MDBRipple>
            ) : (
              ""
            )}

            {userInfo.isAdmin ? (
              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 border-bottom rounded"
                  ref={playQuizItemRef}
                  onClick={toggleUsers}
                >
                  <MDBIcon fas icon="users me-3" />
                  Users
                </MDBListGroupItem>
              </MDBRipple>
            ) : (
              ""
            )}

            <MDBRipple rippleTag="span">
              <MDBListGroupItem
                tag="a"
                href="#"
                action
                className="border-0 border-bottom rounded"
                onClick={logoutHandler}
              >
                <MDBIcon fas icon="fas fa-right-from-bracket me-3" />
                Logout
              </MDBListGroupItem>
            </MDBRipple>
          </MDBListGroup>
        </div>
      </MDBCollapse>
    </>
  );
}
