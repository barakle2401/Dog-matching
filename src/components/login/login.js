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
// import * as firebase from "firebase/app";
// import firebaseApp from "../../firebase";
//const firebaseApp = firebase.initializeApp(firebaseConfig);
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endOfLogin: false
    };
  }
  componentDidMount() {
    var user = firebase.auth().currentUser;
    if (user) {
      var name, email, photoUrl, uid, emailVerified;
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
      this.writeUserAnswers(uid, name);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
    }
  }
  writeUserAnswers = (uid, userName) => {
    firebase
      .database()
      .ref("users/" + uid)
      .set(this.props.finalCategoriesAnswers, function(error) {
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
    const { user, signOut, signInWithGoogle } = this.props;

    return (
      <div>
        {this.state.endOfLogin ? (
          <Redirect
            to={{ pathname: "/dogs-gallery", state: { uid: this.state.uid } }}
          />
        ) : (
          <h1 style={{ color: "red" }}>Loading...</h1>
        )}
      </div>
    );
  }
}

export default Login;
{
  /* <DogsGallery userName={this.state.userName} uid={this.state.uid} /> */
}
