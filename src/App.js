import React, { Component } from "react";
// import withFirebaseAuth from "react-with-firebase-auth";
// import * as firebase from "firebase/app";
// import "firebase/auth";
// import firebaseConfig from "./firebase";
import "./App.css";
import NewDog from "./components/newDog/newDog";
import DogsGallery from "./components/viewDogs/dogsGallery";
import Quiz from "./components/Quiz/quiz";
import MainPage from "./components/main/mainPage";
import Login from "./components/login/login";
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
                <Route path="/" exact component={MainPage} />
                <Route path="/Quiz" exact component={Quiz} />
                <Route path="/NewDog" exact component={NewDog} />
                <Route path="/AllDogs" exact component={DogsGallery} />
                <Route path="/Login" exact component={Login} />
              </Switch>
            </Router>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
