import React from "react";
import { Link } from "react-router-dom";
import "./mainPage.css"
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBFooter
} from "mdbreact";
import "./mainPage.css";
import "firebase/auth";

class MainPage extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="main-page">
        <MDBContainer className="py-5">
          <MDBRow className="main-content">
            <MDBCol md="6 d-flex justify-content-center">
              <MDBRow className="buttons-div">
                <Link to="/login-form">
                  <MDBBtn className="quiz-button-start mt-5">
                    שאלון התאמה
                  </MDBBtn>
                </Link>

                <Link to="/new-dog">
                  <MDBBtn className="quiz-button-form mt-5">
                    טופס הוספת כלב
                  </MDBBtn>
                </Link>
              </MDBRow>{" "}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <MDBFooter>
          <MDBCol md="6 d-flex justify-content-center">
            <MDBRow className="mt-5">
              <a>
                <MDBIcon className="info-icon" icon="info-circle">
                  איך זה עובד{"    "}
                </MDBIcon>
              </a>
            </MDBRow>
          </MDBCol>
          <MDBCol md="6 d-flex justify-content-center">
            <MDBRow className="mt-5">
              <a>
                <Link to="/login">
                  <MDBBtn className="login-button mt-5">היית פה? התחבר</MDBBtn>
                </Link>
              </a>
              <a>
                <Link to="/dogs-gallery">
                  <MDBBtn className="login-button mt-5">צפייה בכלבים</MDBBtn>
                </Link>
              </a>
            </MDBRow>
          </MDBCol>
        </MDBFooter>
      </div>
    );
  }
}
export default MainPage;
