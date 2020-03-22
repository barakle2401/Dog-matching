import React, { Component } from "react";
// import withFirebaseAuth from "react-with-firebase-auth";
// import * as firebase from "firebase/app";
// import "firebase/auth";
// import firebaseConfig from "./firebase";
import "./App.css";
import NewDog from "./components/newDog/newDog";
import Login from "./components/login/login";
import Quiz from "./components/Quiz/quiz";
import MainPage from "./components/main/mainPage";
import LoginForm from "./components/login/loginForm";
import DogsGallery from "./components/viewDogs/dogsGallery";
import * as ROUTES from "./constants/routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Router>
              <Switch>
                <Route exact path={ROUTES.MAIN_PAGE} component={MainPage} />
                <Route path={ROUTES.QUIZ} component={Quiz} />
                <Route path={ROUTES.NEW_DOG} component={NewDog} />
                <Route path={ROUTES.LOGIN} component={Login} />
                <Route path={ROUTES.LOGIN_FORM} component={LoginForm} />
                <Route path="/dogs-gallery" exact component={DogsGallery} />
                {/* <Route
                  path="/dogs-gallery/:uid"
                  exact
                  render={({ match }) => {
                    return <DogsGallery uid={match.params.uid} />;
                  }}
                /> */}
              </Switch>
            </Router>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
