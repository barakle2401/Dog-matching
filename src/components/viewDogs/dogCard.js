import React from "react";
import "./dogCard.css";
import firebase from "../../firebase";
import ViewDog from "./viewDog";
import { Link } from "react-router-dom";

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
      <MDBCol className=" mt-4 mb-4 card-container">
        <MDBCard className="dog-card rounded mb-0" >
          <MDBCardImage

            className="img-fluid dog-image"
            src={this.props.details.imgUrl}
            waves
          />
          <MDBCardBody className="card-body-dog  rounded mt-1">
            <MDBCardTitle className="text-right name-text"><span className="white-text font-weight-bold">
              {this.props.details.name}  {this.props.details.sex == "זכר" ? <span> בן </span> : <span> בת </span>}

              {this.props.details.age}</span> </MDBCardTitle>
            <MDBCardTitle className="text-right percent-text"> <MDBBadge pill className="mb-1 ml-1" color="default"> {this.props.details.totalMatchPercent + "%"} </MDBBadge> <span className=""> אחוזי התאמה </span> </MDBCardTitle>
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
