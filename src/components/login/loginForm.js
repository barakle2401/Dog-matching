import React from "react";
import "./loginForm.css";
import "firebase/auth";
import firebase from "../../firebase";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from "react-router";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody
} from "mdbreact";

class LoginForm extends React.Component {
  state = { isSignedIn: false };
  uiConfig = {
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }

  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
    })

  }
  render() {
    return (
      <div>
        {this.state.isSignedIn ? (
          <Redirect to="/quiz" />
        ) : (
            <div className="main-login">
              <MDBContainer className=" py-5">
                <MDBRow className="justify-content-center">
                  <MDBCol md="6">
                    <MDBCard className="login-card">
                      <MDBCardBody>
                        <form action="/AllDogs">
                          <p className="h3 text-center text-dark mb-4">
                            על מנת שנוכל להתחיל בשאלון
                        </p>
                          <p className="h3 text-center text-dark mb-4">
                            נצטרך שתבצע הרשמה למערכת{" "}
                          </p>
                          <div className="text-center">
                            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
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
export default LoginForm;