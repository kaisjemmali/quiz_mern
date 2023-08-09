import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";

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
      <Navbar bg="info" variant="text-primary" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>QuiZy App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown
                    title={
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <img
                          src={userInfo.image}
                          alt="user-pic"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "1cm",
                          }}
                        />
                        <h6 style={{ marginTop: "10px", paddingLeft: "5px" }}>
                          {userInfo.name}
                        </h6>
                      </div>
                    }
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    {userInfo.isAdmin ? (
                      <LinkContainer to="/admin-dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                    ) : (
                      <LinkContainer to="/user-dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                    )}

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

///////////////////////////////////////////////

// import React from "react";
// import { Nav, NavDropdown } from "react-bootstrap";
// import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
// import { LinkContainer } from "react-router-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { Logout } from "../Redux/auhSlice";
// import { useNavigate } from "react-router-dom";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

// const Header = () => {
//   const { userInfo } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logoutHandler = (e) => {
//     e.preventDefault();
//     dispatch(Logout());
//     navigate("/login");
//   };

//   return (
//     <header>
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBar position="static">
//           <Toolbar>
//             <IconButton
//               size="large"
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//               sx={{ mr: 2 }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//               Quizy
//             </Typography>
//             {userInfo ? (
//               <>
//                 <NavDropdown
//                   title={
//                     <div
//                       style={{
//                         display: "flex",
//                       }}
//                     >
//                       <img
//                         src={userInfo.image}
//                         alt="user-pic"
//                         style={{
//                           width: "40px",
//                           height: "40px",
//                           borderRadius: "1cm",
//                         }}
//                       />
//                       <h6 style={{ marginTop: "10px", paddingLeft: "5px" }}>
//                         {userInfo.name}
//                       </h6>
//                     </div>
//                   }
//                 >
//                   <LinkContainer to="/profile">
//                     <NavDropdown.Item>Profile</NavDropdown.Item>
//                   </LinkContainer>
//                   <NavDropdown.Item onClick={logoutHandler}>
//                     Logout
//                   </NavDropdown.Item>
//                 </NavDropdown>
//               </>
//             ) : (
//               <>
//                 <LinkContainer to="/login">
//                   <Nav.Link>
//                     <FaSignInAlt /> Sign In
//                   </Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to="/register">
//                   <Nav.Link>
//                     <FaSignOutAlt /> Sign Up
//                   </Nav.Link>
//                 </LinkContainer>
//               </>
//             )}
//           </Toolbar>
//         </AppBar>
//       </Box>
//     </header>
//   );
// };

// export default Header;
