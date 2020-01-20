import React from "react";
import "./App.css";
import NewDog from "./components/newDog/newDog";
import DogGallery from "./components/viewDogs/dogsGallery";
import Quiz from "./components/Quiz/quiz";
import MainPage from "./components/main/mainPage";
import Login from "./components/login/login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/Quiz" exact component={Quiz} />
          <Route path="/NewDog" exact component={NewDog} />
          <Route path="/AllDogs" exact component={DogGallery} />
          <Route path="/Login" exact component={Login} />
        </Switch>
      </Router>

      {/* <NewDog /> */}
      {/* <DogGallery /> */}
      {/* <QUIZ /> */}
    </div>
  );
}

export default App;
