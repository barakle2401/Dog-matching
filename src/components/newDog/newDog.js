import React from "react";
import firebase from "../../firebase";
import SweetAlert from "sweetalert2-react";
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
    this.state = {
      categoriesInfo: {
        energy: 1,
        independence: 1,
        confidence: 1,
        focus: 1
      },
      showAlert: false
    };
  }
  handleChange = e => {
    let categoriesInfo = this.state.categoriesInfo;
    categoriesInfo[e.target.id] = e.target.value;
    this.setState({ categoriesInfo: categoriesInfo });
  };
  handleSubmit = async e => {
    let showAlert = false;
    e.preventDefault(); // <- prevent form submit from reloading the page
    await firebase
      .database()
      .ref("/DogsInfo/" + this.state.categoriesInfo.name)
      .set(this.state.categoriesInfo, function(error) {
        if (error) {
          console.log("The write failed...");
        } else {
          // Data saved successfully!
          showAlert = true;
        }
      });
    showAlert
      ? this.setState({ showAlert: true })
      : console.log("The write failed...");
  };

  render() {
    return (
      <div>
        {this.state.showAlert ? (
          <div className="main-new-dog py-5 ">
            <SweetAlert
              show={this.state.showAlert}
              title="Thank you!"
              text="Data saved successfully!"
              onConfirm={() => (window.location = "/")}
            />
          </div>
        ) : (
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
                    value={this.state.focus}
                    id="focus"
                    name={"מיקוד"}
                    maxNum={10}
                  />
                  <Option
                    handleChange={this.handleChange}
                    value={this.state.confidence}
                    id="confidence"
                    name={"ביטחון עצמי"}
                    maxNum={10}
                  />
                  <Option
                    handleChange={this.handleChange}
                    value={this.state.independence}
                    id="independence"
                    name="עצמאות"
                    maxNum={10}
                  />

                  <Option
                    handleChange={this.handleChange}
                    value={this.state.energy}
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
        )}
      </div>
    );
  }
}

export default NewDog;
