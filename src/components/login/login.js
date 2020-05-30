import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./login.css";
import firebase from "../../firebase";
import LoginForm from "./loginForm";
import DogsGallery from "../viewDogs/dogsGallery";
import withFirebaseAuth from "react-with-firebase-auth";
import "firebase/auth";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import Loader from 'react-loader-spinner'
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endOfLogin: false
    };
  }
  componentDidMount() {
    // wait until the user has been registered in and save the data for the current user 
    var user = firebase.auth().currentUser;
    if (user) {
      var name, email, photoUrl, uid, emailVerified;
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
      this.writeUserAnswers(uid, name, email);
    }
  }

  writeUserAnswers = (uid, userName, email) => {
    //Store for each user, quiz percents and login email
    let userMailAndAnswers = {
      'mail': email,
      'answers': this.props.finalCategoriesAnswers
    };

    firebase
      .database()
      .ref("users/" + uid)
      .set(userMailAndAnswers, function (error) {
        if (error) {
          console.log("The write failed...");
        } else {
          // Data saved successfully!
          console.log("DATA SAVED");
        }
      })
      .then(() => {
        this.setState({ userName: userName, uid: uid, endOfLogin: true });
      });
  };

  render() {


    return (
      <div>
        {this.state.endOfLogin ? (
          <Redirect
            to={{ pathname: "/dogs-gallery", state: { uid: this.state.uid, userName: this.state.userName } }}
          />
        ) : (
            <MDBContainer className="py-5">
              <MDBRow className="main-content">
                <MDBCol md="6 d-flex justify-content-center">
                  <MDBRow className="buttons-div">
                    <h2>  מיד תוכל לצפות בתוצאות בהתאמות עבורך</h2>

                  </MDBRow>
                </MDBCol>

              </MDBRow>
              <MDBRow className="main-content">
                <MDBCol md="6 d-flex justify-content-center">
                  <MDBRow className="buttons-div">

                    <Loader
                      type="BallTriangle"
                      color="#000000"
                      height={150}
                      width={150}


                    />

                  </MDBRow>
                </MDBCol>

              </MDBRow>
            </MDBContainer>
          )}
      </div>
    );
  }
}

export default Login;

