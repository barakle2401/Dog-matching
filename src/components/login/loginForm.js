import React from "react";
import "./loginForm.css";
import "firebase/auth";
import firebase from "../../firebase";
import withFirebaseAuth from "react-with-firebase-auth";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon
} from "mdbreact";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    return (
      <div>
        {user ? (
          <Redirect to="/quiz" />
        ) : (
          <div className="main-login">
            <MDBContainer className=" py-5">
              <MDBRow>
                <MDBCol md="6">
                  <MDBCard className="login-card">
                    <MDBCardBody>
                      <form action="/AllDogs">
                        <p className="h3 text-center text-light mb-4">
                          על מנת שנוכל להתחיל בשאלון
                        </p>
                        <p className="h3 text-center text-light mb-4">
                          נצטרך שתבצע התחברות קלה למערכת{" "}
                        </p>
                        <div className="text-center">
                          <MDBBtn onClick={signInWithGoogle}>
                            {" "}
                            <MDBIcon fab icon="google" /> Sign In
                          </MDBBtn>
                        </div>
                      </form>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        )}
      </div>
    );
  }
}
const firebaseAppAuth = firebase.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(LoginForm);
