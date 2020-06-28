import React, { Component } from "react";
import "./App.css";
import Login from "./components/login/login";
import Quiz from "./components/Quiz/quiz";
import MainPage from "./components/main/mainPage";
import LoginForm from "./components/login/loginForm";
import DogsGallery from "./components/viewDogs/dogsGallery";
import NewDogForm from "./components/newDog/new_dog_form";
import ViewDog from "./components/viewDogs/viewDog";
import * as ROUTES from "./constants/routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header"


class App extends Component {
  render() {
    return (
      <div className="App">

        <Header />
        <Router>
          <Switch>
            <Route exact path={ROUTES.MAIN_PAGE} component={MainPage} />
            <Route path={ROUTES.QUIZ} component={Quiz} />
            <Route path={ROUTES.NEW_DOG_FORM} component={NewDogForm} />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.LOGIN_FORM} component={LoginForm} />
            <Route path={ROUTES.DOGS_GALLERY} exact component={DogsGallery} />
            <Route path={ROUTES.VIEW_DOG} exact component={ViewDog} />
          </Switch>
        </Router>


      </div>
    );
  }
}

export default App;
