import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBRow,
  MDBIcon
} from "mdbreact";
class DogCard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(data => this.setState({ imageSrc: data.message }));
  }
  render() {
    return (
      <MDBCol className="m-2 py-4">
        <MDBCard border="light">
          <MDBCardImage
            className="img-fluid"
            src={this.state.imageSrc}
            style={{ width: "320px", height: "320px" }}
            hover
          />
          <MDBCardBody>
            <MDBCardTitle>Card title</MDBCardTitle>
            <MDBCardText>
              Some quick example text to build on the card title and make up the
              bulk of the card&apos;s content.
            </MDBCardText>
            <MDBRow className="d-flex justify-content-center">
              <MDBBtn id="card-btn" size="sm">
                <MDBIcon icon="info" />
                {"  "} View
              </MDBBtn>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}
export default DogCard;