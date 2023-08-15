import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBSpinner,
  MDBCol,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Redux/categorySlice";

const Hero = () => {
  const dispatch = useDispatch();
  const { data: categories, loading } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="home-container">
        <MDBSpinner color="primary">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </div>
    );
  }

  return (
    <div className="home-container">
      <MDBContainer
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        {categories.map((category) => (
          <MDBCard
            className="mb-3"
            key={category._id}
            style={{ width: "45%", margin: "20px" }}
          >
            <MDBCardImage
              position="top"
              src={category.photoUrl}
              alt={category.name}
              style={{
                height: "300px",
                objectFit: "cover",
              }}
            />
            <MDBCardBody>
              <MDBCardTitle>{category.name}</MDBCardTitle>
              <MDBCardText>{category.description}</MDBCardText>
              <MDBCardText>
                <small className="text-muted">Last updated 3 mins ago</small>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        ))}
      </MDBContainer>
      <MDBContainer className="py-5">
        <MDBRow className="d-flex justify-content-center">
          <MDBCol md="10" xl="8" className="text-center">
            <h3 className="mb-4">Testimonials</h3>
            <p className="mb-4 pb-2 mb-md-5 pb-md-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
              error amet numquam iure provident voluptate esse quasi, veritatis
              totam voluptas nostrum quisquam eum porro a pariatur veniam.
            </p>
          </MDBCol>
        </MDBRow>
        <MDBRow className="text-center d-flex align-items-stretch">
          <MDBCol md="4" className="mb-5 mb-md-0 d-flex align-items-stretch">
            <MDBCard className="testimonial-card">
              <div
                className="card-up"
                style={{ backgroundColor: "#9d789b" }}
              ></div>
              <div className="avatar mx-auto bg-white">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                  className="rounded-circle img-fluid"
                  alt="photos"
                />
              </div>
              <MDBCardBody>
                <h4 className="mb-4">Maria Smantha</h4>
                <hr />
                <p className="dark-grey-text mt-4">
                  <MDBIcon fas icon="quote-left" className="pe-2" />
                  Lorem ipsum dolor sit amet eos adipisci, consectetur
                  adipisicing elit.
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4" className="mb-5 mb-md-0 d-flex align-items-stretch">
            <MDBCard className="testimonial-card">
              <div
                className="card-up"
                style={{ backgroundColor: "#7a81a8" }}
              ></div>
              <div className="avatar mx-auto bg-white">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                  className="rounded-circle img-fluid"
                  alt="photos"
                />
              </div>
              <MDBCardBody>
                <h4 className="mb-4">Lisa Cudrow</h4>
                <hr />
                <p className="dark-grey-text mt-4">
                  <MDBIcon fas icon="quote-left" className="pe-2" />
                  Neque cupiditate assumenda in maiores repudi mollitia
                  architecto.
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4" className="mb-5 mb-md-0 d-flex align-items-stretch">
            <MDBCard className="testimonial-card">
              <div
                className="card-up"
                style={{ backgroundColor: "#6d5b98" }}
              ></div>
              <div className="avatar mx-auto bg-white">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
                  className="rounded-circle img-fluid"
                  alt="photos"
                />
              </div>
              <MDBCardBody>
                <h4 className="mb-4">John Smith</h4>
                <hr />
                <p className="dark-grey-text mt-4">
                  <MDBIcon fas icon="quote-left" className="pe-2" />
                  Delectus impedit saepe officiis ab aliquam repellat rem unde
                  ducimus.
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Hero;
