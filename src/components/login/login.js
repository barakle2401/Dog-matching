import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./login.css";
import firebase from "../../firebase";
// import LoginForm from "./loginForm";
// import DogsGallery from "../viewDogs/dogsGallery";
// import withFirebaseAuth from "react-with-firebase-auth";
// import { Link } from "react-router-dom";
import "firebase/auth";
import { Redirect } from "react-router";
import LoaderSpinner from "../loader/loader"
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
            <LoaderSpinner />
          )}
      </div>
    );
  }
}

export default Login;

