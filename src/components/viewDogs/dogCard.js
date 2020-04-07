import React from "react";
import "./dogCard.css";

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
  componentDidMount() { }
  render() {
    return (
      <MDBCol className="m-5 ">
        <MDBCard className="dog-card rounded mb-0" style={{ width: "22rem" }}>
          <MDBCardImage
            style={{ height: "10rem", width: "100%" }}
            className="img-fluid"
            src={this.props.details.imgUrl}
            waves
          />
          <MDBCardBody>
            <MDBCardTitle>{this.props.details.name}</MDBCardTitle>
            <MDBCardTitle>{this.props.details.totalMatchPercent + "%"} - אחוז התאמה </MDBCardTitle>
            <MDBCardText>
              {this.props.details.desc}

            </MDBCardText>
            <button className="button button-primary">
              <i className="fa fa-chevron-right"></i> לעוד פרטים
            </button>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}
export default DogCard;
