import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import DogCard from "./dogCard";
import "./dogsGallery.css";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase";
import Login from "../login/login";
const firebaseApp = firebase.initializeApp(firebaseConfig);
class DogsGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {}
  writeUserAnswers = myUserId => {
    firebase
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
    let myUserId;
    if (firebase.auth().currentUser) {
      myUserId = firebase.auth().currentUser.uid;
      //console.log(myUserId);
      this.writeUserAnswers(myUserId);
      // console.log(this.props.answers);
    }

    const { user, signOut, signInWithGoogle } = this.props;
    return (
      <div>
        {user ? (
          <MDBContainer className="container dogs-gallery-container ">
            <MDBRow className="d-flex justify-content-center">
              <MDBCol>
                {" "}
                <DogCard
                  name="שון - 74%"
                  description="שון החתיך רוצה כבר בית משלו! כלבון אנרגטי, חכם, אוהב ליטופים, קופץ לגובה ומחונך לצרכים :) אוהב לשחק במים, לאכול ירקות (שמותר לכלבים), להתכרבל ולהתפנק. שון זקוק לאנשים שיכולים להשקיע מאמץ בעבודה איתו וכאלה שבעיקר יוכל לסמוך עליהם, אוהב מאוד לעשות תרגילים וקשוב, יכול להתאים לזוג צעיר או משפחה עם ילדים בוגרים. מסתדר עם חלק מהכלבים אך לא תוקפן לאלו שלא. כרגע לא מסתדר עם חתולים. רידג׳בק מעורב | בן 3 | גדול | מחכה בכלביית נתניה להתעניינות באימוץ ופרטים נוספים --> צרו קשר בטלפון **055-6675229** (אם אין מענה שלחו וואטסאפ ונחזור בהקדם) פרטים נוספים בדף של שון באתר שלנו: http://herzelialovesanimals.org/pet/shon/"
                />
              </MDBCol>
              <MDBCol>
                {" "}
                <DogCard />
              </MDBCol>
              <MDBCol>
                {" "}
                <DogCard />
              </MDBCol>
            </MDBRow>
            <MDBRow className="d-flex justify-content-center">
              <MDBCol>
                {" "}
                <DogCard />
              </MDBCol>
              <MDBCol>
                {" "}
                <DogCard />
              </MDBCol>
              <MDBCol>
                {" "}
                <DogCard />
              </MDBCol>
            </MDBRow>
            <MDBRow className="d-flex justify-content-center">
              <MDBCol>
                {" "}
                <DogCard />
              </MDBCol>
              <MDBCol>
                {" "}
                <DogCard />
              </MDBCol>
              <MDBCol>
                {" "}
                <DogCard />
              </MDBCol>
            </MDBRow>
            <MDBRow className="d-flex justify-content-center">
              <MDBCol>
                {" "}
                <DogCard />
              </MDBCol>
              <MDBCol>
                {" "}
                <DogCard />
              </MDBCol>
              <MDBCol>
                {" "}
                <DogCard />
              </MDBCol>
            </MDBRow>
            <MDBRow className="d-flex justify-content-center">
              <MDBCol>
                {" "}
                <DogCard />
              </MDBCol>
              <MDBCol>
                {" "}
                <DogCard />
              </MDBCol>
              <MDBCol>
                {" "}
                <DogCard />
              </MDBCol>
            </MDBRow>
            <MDBRow className="d-flex justify-content-center">
              <MDBCol>
                {" "}
                <DogCard />
              </MDBCol>
              <MDBCol>
                {" "}
                <DogCard />
              </MDBCol>
              <MDBCol>
                {" "}
                <DogCard />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        ) : (
          <Login signIn={signInWithGoogle} />
        )}
      </div>
    );
  }
}
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(DogsGallery);
