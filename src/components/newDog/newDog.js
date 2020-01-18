import React from "react";
import firebase from "../../firebase";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon
} from "mdbreact";
import "./newDog.css";
import Option from "./option";
import Input from "./input";
class NewDog extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    //console.log(this.state);
  };
  handleSubmit = e => {
    e.preventDefault(); // <- prevent form submit from reloading the page
    firebase
      .database()
      .ref("/DogsInfo/" + this.state.name)
      .set(this.state);
    console.log("DATA SAVED");
  };
  render() {
    return (
      <div>
        <MDBContainer className="container new-dog-container">
          <form className="text-center mt-5 p-5 " onSubmit={this.handleSubmit}>
            <p className="h5 text-center mb-4 text-secondary">טופס כלב חדש</p>
            <div className="form-row d-flex justify-content-center">
              <Input
                handleChange={this.handleChange}
                value={this.state.name}
                name={"שם"}
              />
            </div>
            <br />
            <div className="form-row d-flex justify-content-center">
              <Option
                handleChange={this.handleChange}
                name={"גודל"}
                maxNum={5}
              />
              <Option
                handleChange={this.handleChange}
                name={"אנרגיה"}
                maxNum={5}
              />
              <Option
                handleChange={this.handleChange}
                name={"בריאות"}
                maxNum={5}
              />
              <Option
                handleChange={this.handleChange}
                name={"גיל"}
                maxNum={15}
              />
            </div>

            <div className="form-row"></div>
            <div className="text-center">
              <MDBBtn type="submit">שלח</MDBBtn>
            </div>
          </form>
        </MDBContainer>
      </div>
    );
  }
}

export default NewDog;
