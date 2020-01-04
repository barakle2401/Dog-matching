import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon
} from "mdbreact";
import DogCard from "./dogCard";
import "./dogsGallery.css";
class DogGallery extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <MDBContainer className="container dogs-gallery-container ">
        <MDBRow className="d-flex justify-content-center">
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default DogGallery;
