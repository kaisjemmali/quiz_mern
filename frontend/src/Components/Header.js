import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";

import "./Header.css"; // Import your custom CSS for styling

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(Logout());
    navigate("/login");
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container className="d-flex justify-content-between">
          {" "}
          <LinkContainer to="/">
            <Navbar.Brand>QuiZy App</Navbar.Brand>
          </LinkContainer>
          <ul className="navbar-nav">
            {userInfo ? (
              <>
                <li className="nav-item">
                  <LinkContainer to="/profile">
                    <a className="nav-link">
                      <img
                        src={userInfo.image}
                        alt="user-pic"
                        className="user-image"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "1cm",
                        }}
                      />
                    </a>
                  </LinkContainer>
                </li>
                <li className="nav-item">
                  <LinkContainer to="/profile">
                    <a className="nav-link">Profile</a>
                  </LinkContainer>
                </li>
                {userInfo.isAdmin ? (
                  <li className="nav-item">
                    <LinkContainer to="/admin-dashboard">
                      <a className="nav-link">Admin Dashboard</a>
                    </LinkContainer>
                  </li>
                ) : (
                  <li className="nav-item">
                    <LinkContainer to="/user-dashboard">
                      <a className="nav-link">Dashboard</a>
                    </LinkContainer>
                  </li>
                )}
                <li className="nav-item">
                  <a className="nav-link logout-link" onClick={logoutHandler}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <LinkContainer to="/login">
                    <a className="nav-link">
                      <FaSignInAlt /> Sign In
                    </a>
                  </LinkContainer>
                </li>
                <li className="nav-item">
                  <LinkContainer to="/register">
                    <a className="nav-link">
                      <FaSignOutAlt /> Sign Up
                    </a>
                  </LinkContainer>
                </li>
              </>
            )}
          </ul>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
