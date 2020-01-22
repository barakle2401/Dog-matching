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
    this.setState({ [e.target.id]: e.target.value });
  };
  // handleCategory = e => {
  //   this.setState({ [e.target.id]: e.target.value });
  //   //console.log(e.target.id);
  // };
  handleSubmit = e => {
    e.preventDefault(); // <- prevent form submit from reloading the page
    firebase
      .database()
      .ref("/DogsInfo/" + this.state.name)
      .set(this.state);
    console.log("DATA SAVED");
  };
  render() {
    console.log(this.state);
    return (
      <div className="main-new-dog py-5 ">
        <MDBContainer className="container new-dog-container">
          <form
            className="text-center mt-5 p-5 form-content "
            onSubmit={this.handleSubmit}
          >
            <p className="h3 text-center mb-4 text-light">טופס כלב חדש</p>
            <div className="form-row d-flex justify-content-center">
              <Input
                handleChange={this.handleChange}
                value={this.state.name}
                id="name"
                name={"שם"}
              />
            </div>
            <br />
            <div className="form-row d-flex justify-content-center">
              <Option
                handleChange={this.handleChange}
                id="focus"
                name={"מיקוד"}
                maxNum={10}
              />
              <Option
                handleChange={this.handleChange}
                id="confidence"
                name={"ביטחון עצמי"}
                maxNum={10}
              />
              <Option
                handleChange={this.handleChange}
                id="independence"
                name="עצמאות"
                maxNum={10}
              />

              <Option
                handleChange={this.handleChange}
                id={"energy"}
                name="אנרגיה"
                maxNum={10}
              />
            </div>

            <div className="form-row"></div>
            <div className="text-center mt-4">
              <MDBBtn type="submit">שלח</MDBBtn>
            </div>
          </form>
        </MDBContainer>
      </div>
    );
  }
}

export default NewDog;
