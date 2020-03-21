import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./login.css";
import firebase from "../../firebase";
import LoginForm from "./loginForm";
import DogsGallery from "../viewDogs/dogsGallery";
import withFirebaseAuth from "react-with-firebase-auth";
import "firebase/auth";
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
    this.setState({ endOfLogin: false });

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
    // check on previous state
    // only write when it's different with the new state
    if (prevState !== this.state) {
      // console.log(this.state.endOfLogin);
    }
  }
  writeUserAnswers = (uid, userName) => {
    firebase
      .database()
      .ref("users/" + uid)
      .set(this.props.finalCategoriesAnswers, function(error) {
        if (error) {
          console.log("The write failed..." + userName);
        } else {
          // Data saved successfully!
          console.log("DATA SAVED" + userName);
        }
      })
      .then(() => {
        this.setState({ userName: userName, uid: uid, endOfLogin: true });
      });
  };

  render() {
    console.log(this.state.endOfLogin);
    const { user, signOut, signInWithGoogle } = this.props;
    return (
      <div>
        {!this.state.endOfLogin ? (
          <LoginForm signIn={signInWithGoogle} />
        ) : (
          <DogsGallery userName={this.state.userName} uid={this.state.uid} />
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
})(Login);
//export default DogsGallery;
