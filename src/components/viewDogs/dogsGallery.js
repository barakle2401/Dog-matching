import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import DogCard from "./dogCard";
import "./dogsGallery.css";
import firebase from "../../firebase";
import Login from "../login/login";
import withFirebaseAuth from "react-with-firebase-auth";
// import * as firebase from "firebase/app";
import "firebase/auth";
// import firebaseApp from "../../firebase";
//const firebaseApp = firebase.initializeApp(firebaseConfig);
class DogsGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    let myUserId = "not found";
    if (firebase.auth().currentUser) {
      myUserId = firebase.auth().currentUser.uid;
      this.writeUserAnswers(myUserId);
    }
    console.log(myUserId);
  }
  writeUserAnswers = async myUserId => {
    await await firebase
      .database()
      .ref("users/" + myUserId)
      .set(this.props.answers, function(error) {
        if (error) {
          console.log("The write failed...");
        } else {
          // Data saved successfully!
          console.log("DATA SAVED");
        }
      });
  };

  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    console.log("user:", user);
    return (
      <div>
        {user ? (
          <MDBContainer className="container dogs-gallery-container ">
            <h1>Hello</h1>
          </MDBContainer>
        ) : (
          <Login signIn={signInWithGoogle} />
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
})(DogsGallery);
//export default DogsGallery;
