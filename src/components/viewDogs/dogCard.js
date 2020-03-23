import React from "react";
import "./dogCard.css";
import CardHeader from "./cardHeader";
import CardBody from "./cardBody";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol
} from "mdbreact";
class DogCard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <MDBCol className="m-5 ">
        <MDBCard className="dog-card rounded mb-0" style={{ width: "22rem" }}>
          <MDBCardImage
            style={{ height: "10rem", width: "100%" }}
            className="img-fluid"
            src={this.props.details.image}
            waves
          />
          <MDBCardBody>
            <MDBCardTitle>{this.props.details.category}</MDBCardTitle>
            <MDBCardText>
              {this.props.details.title}
              {this.props.details.text}
            </MDBCardText>
            <button className="button button-primary">
              <i className="fa fa-chevron-right"></i> Find out more
            </button>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}
export default DogCard;
