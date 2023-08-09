import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Quiz from "../Quizz.jpg";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">QuiZy App</h1>
          <img
            src={Quiz}
            alt="Quiz"
            style={{ width: "650px", height: "300px" }}
          />
          <br />
          <p className="text-center mb-4">Pass Your Quiz and have Fun !</p>
          {userInfo ? (
            ""
          ) : (
            <div className="d-flex">
              <LinkContainer to="/login">
                <Button variant="primary" className="me-3">
                  Sign In
                </Button>
              </LinkContainer>
              <LinkContainer to="/register">
                <Button variant="secondary">Sign Up</Button>
              </LinkContainer>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
