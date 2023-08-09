import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainer from "../Components/FormContainer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../Redux/userSlice";
import { toast } from "react-toastify";
const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.setEmail, userInfo.setName]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (file) {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", "mern-auth");

      await axios
        .post("https://api.cloudinary.com/v1_1/djkaqv7wi/upload", form)
        .then(async (res) => {
          const formValue = {
            name,
            email,
            password,
            image: res.data.url,
          };
          dispatch(updateProfile({ formValue, toast, navigate }));
        });
    } else {
      const formValue = {
        name,
        email,
        password,
      };
      dispatch(updateProfile({ formValue, toast, navigate }));
    }
  };

  return (
    <FormContainer>
      <h1>Update Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            value={name}
            name="name"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Adress</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter Email"
            name="email"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Passsword</Form.Label>
          <Form.Control
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
            type="password"
            placeholder="Enter your password"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="image">
          <Form.Label>Your Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfilePage;
