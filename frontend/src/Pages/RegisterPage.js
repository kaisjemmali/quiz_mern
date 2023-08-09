// import React, { useState } from "react";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import FormContainer from "../Components/FormContainer";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { register } from "../Redux/userSlice";

// const RegisterPage = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (name === "" || email === "" || password === "") {
//       toast.warning("Please Enter all the fields");
//     } else {
//       try {
//         const formValue = {
//           name,
//           email,
//           password,
//         };
//         await dispatch(register({ formValue, toast, navigate }));
//       } catch (error) {
//         console.error("Error:", error.message);
//         toast.error("An error occurred during registration");
//       }
//     }
//   };

//   return (
//     <FormContainer>
//       <h1>Sign Up</h1>
//       <Form onSubmit={submitHandler}>
//         <Form.Group className="my-2" controlId="name">
//           <Form.Label>Name:</Form.Label>
//           <Form.Control
//             name="name"
//             type="text"
//             placeholder="Enter your name"
//             onChange={(e) => {
//               setName(e.target.value);
//             }}
//           ></Form.Control>
//         </Form.Group>
//         <Form.Group className="my-2" controlId="email">
//           <Form.Label>Email Adress</Form.Label>
//           <Form.Control
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//             type="email"
//             placeholder="Enter Email"
//             name="email"
//           ></Form.Control>
//         </Form.Group>
//         <Form.Group className="my-2" controlId="password">
//           <Form.Label>Passsword</Form.Label>
//           <Form.Control
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//             name="password"
//             type="password"
//             placeholder="Enter your password"
//           ></Form.Control>
//         </Form.Group>
//         <Button type="submit" variant="primary" className="mt-3">
//           Sign Up
//         </Button>
//         <Row className="py-3">
//           <Col>
//             Already have an account ? <Link to="/login">Login </Link>
//           </Col>
//         </Row>
//       </Form>
//     </FormContainer>
//   );
// };

// export default RegisterPage;

////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { register } from "../Redux/userSlice";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      toast.warning("Please Enter all the fields");
    } else {
      try {
        const formValue = {
          name,
          email,
          password,
        };
        await dispatch(register({ formValue, toast, navigate }));
      } catch (error) {
        console.error("Error:", error.message);
        toast.error("An error occurred during registration");
      }
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Your Name"
                    name="name"
                    id="form1"
                    type="text"
                    className="w-100"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Your Email"
                    name="email"
                    id="form2"
                    type="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    name="password"
                    id="form3"
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <MDBBtn className="mb-4" size="lg">
                  Register
                </MDBBtn>
                <div className="mt-3">
                  <p className="mb-0  text-center">
                    Already have an account?{" "}
                    <a href="{''}" className="text-primary fw-bold">
                      <Link to="/login">Login </Link>
                    </a>
                  </p>
                </div>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  fluid
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </Form>
  );
};

export default RegisterPage;
