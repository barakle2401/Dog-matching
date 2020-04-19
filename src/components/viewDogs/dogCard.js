import React from "react";
import "./dogCard.css";
import ViewDog from "./viewDog";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol, MDBBadge
} from "mdbreact";
class DogCard extends React.Component {
  constructor() {
    super();
    this.state = {
      uidReady: false
    };
  }
  componentDidMount() {
    var user = firebase.auth().currentUser;
    if (user && !this.state.uidReady) {
      var uid;

      uid = user.uid;
      this.setState({ uid: uid, uidReady: true });
    }

  }
  render() {
    return (
      <MDBCol className="m-1 card-container">
        <MDBCard className="dog-card rounded mb-0" >
          <MDBCardImage
            style={{ height: "18rem", width: "100%" }}
            className="img-fluid"
            src={this.props.details.imgUrl}
            waves
          />
          <MDBCardBody className="card-body-dog">
            <MDBCardTitle className="text-right name-text">{this.props.details.name}, בן  {this.props.details.age} </MDBCardTitle>
            <MDBCardTitle className="text-right percent-text"> <MDBBadge pill className="mb-1 ml-1" color="default"> {this.props.details.totalMatchPercent + "%"} </MDBBadge> <span className=""> אחוז התאמה </span> </MDBCardTitle>
            <MDBCardText>
              {this.props.details.desc}

            </MDBCardText>
            <Link to={{ pathname: "/view-dog", state: { dogDetails: this.props.details, uid: this.state.uid } }}>
              <button className="button button-primary" >
                לעוד פרטים     <i className="fa fa-chevron-left"></i>
              </button>
            </Link>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}
export default DogCard;
