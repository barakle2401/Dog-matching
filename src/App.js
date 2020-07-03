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
import Loader from 'react-loader-spinner';
import Admin from "./components/admin/admin"
import EditDog from "./components/admin/edit_dog"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



class App extends Component {

  state = {
    loading: true
  };
  componentDidMount() {
    // this simulates an async action, after which the component will render the content
    demoAsyncCall().then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;
    // if (loading) { // if component doesn't have to wait for an async action, remove this block 

    //   return (

    //     <div className="d-flex justify-content-center">
    //       <div className="loader-wrapper-main">
    //         <Loader

    //           type="Puff"
    //           color="#ff00b3"
    //           height={170}
    //           width={200}
    //           timeout={3000} //3 secs

    //         />
    //       </div>
    //     </div>
    //   )

    //   // render null when app is not ready
    // }
    return (

      <div className="App">


        <Router>
          <Switch>
            <Route exact path={ROUTES.MAIN_PAGE} component={MainPage} />
            <Route path={ROUTES.QUIZ} component={Quiz} />
            <Route path={ROUTES.NEW_DOG_FORM} component={NewDogForm} />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.LOGIN_FORM} component={LoginForm} />
            <Route path={ROUTES.DOGS_GALLERY} exact component={DogsGallery} />
            <Route path={ROUTES.VIEW_DOG} exact component={ViewDog} />
            <Route path={ROUTES.ADMIN} exact component={Admin} />
            <Route path={ROUTES.EDIT_DOG} exact component={EditDog} />
          </Switch>
        </Router>


      </div>
    );
  }
}
function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 2500));
}
export default App;
