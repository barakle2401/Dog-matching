import React from "react";
import firebase from "../../firebase";
import { storage } from "../../firebase";
import SweetAlert from "sweetalert2-react";
import Loader from "react-loader-spinner";
import ImageUploader from "react-images-upload";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBView,
  MDBMask
} from "mdbreact";
// import "./newDog.css";
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
        focus: 1,
        imageUrl: ""
      },
      showAlert: false,
      submittingForm: false,
      image: null
    };
  }
  handleChange = e => {
    let categoriesInfo = this.state.categoriesInfo;
    categoriesInfo[e.target.id] = e.target.value;

    this.setState({ categoriesInfo: categoriesInfo });
  };
  fileSelectedHandler = e => {
    console.log(e.target.files[0]);
    this.setState({ image: e.target.files[0] });
  };
  handleFireBaseUpload = e => {
    let { image, categoriesInfo } = this.state;

    //start upload

    // async magic goes here...
    if (image === "") {
      console.error(`not an image, the image file is a ${typeof image}`);
    }
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      snapShot => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      err => {
        //catches the errors
        console.log(err);
        alert('Error Acquired, Please Try Again...')
      },
      () => {
        // gets the functions from storage references the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(fireBaseUrl => {
            this.setState(prevObject => ({
              ...prevObject,
              categoriesInfo: categoriesInfo,
              imgUrl: fireBaseUrl
            }));

          });
      }
    );
  };
  handleImageDelete = () => {
    let categoriesInfo = this.state.categoriesInfo;
    categoriesInfo["imgUrl"] = "";

    this.setState({ categoriesInfo: categoriesInfo });
  };
  handleSubmit = async e => {
    this.setState({ submittingForm: true });
    let showAlert = false;
    e.preventDefault(); // <- prevent form submit from reloading the page
    await this.handleFireBaseUpload();

    await firebase
      .database()
      .ref("/DogsInfo")
      .push(this.state, function (error) {
        if (error) {
          console.log("The write failed...");
        } else {
          // Data saved successfully!
          showAlert = true;
        }
      });

    showAlert
      ? this.setState({ showAlert: true, submittingForm: false })
      : console.log("The write failed...");
  };

  render() {
    return (
      <div className="border">
        {this.state.submittingForm ? (
          <div className="main-page">
            <MDBContainer className="py-5">
              <MDBRow className="main-content">
                <MDBCol md="6 d-flex justify-content-center">
                  <MDBRow className="buttons-div">
                    {/* <h1>Uploading image...</h1> */}
                    <Loader
                      type="BallTriangle"
                      color="#000000"
                      height={150}
                      width={150}
                    />
                  </MDBRow>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        ) : (
            <div className="form">
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
                        <p className="h3 text-center mb-4 text-light">
                          טופס כלב חדש
                    </p>
                        <div className="form-row d-flex justify-content-center">
                          <Input
                            handleChange={this.handleChange}
                            value={this.state.categoriesInfo.name}
                            id="name"
                            name={"שם"}
                          />
                        </div>
                        <br />
                        <div className="form-row d-flex justify-content-center">
                          <Option
                            handleChange={this.handleChange}
                            value={this.state.categoriesInfo.focus}
                            id="focus"
                            name={"מיקוד"}
                            maxNum={10}
                          />
                          <Option
                            handleChange={this.handleChange}
                            value={this.state.categoriesInfo.confidence}
                            id="confidence"
                            name={"ביטחון עצמי"}
                            maxNum={10}
                          />
                          <Option
                            handleChange={this.handleChange}
                            value={this.state.categoriesInfo.independence}
                            id="independence"
                            name="עצמאות"
                            maxNum={10}
                          />

                          <Option
                            handleChange={this.handleChange}
                            value={this.state.categoriesInfo.energy}
                            id={"energy"}
                            name="אנרגיה"
                            maxNum={10}
                          />
                        </div>
                        {this.state.categoriesInfo.imgUrl ? (
                          <div className="form-row d-flex justify-content-center p-5">
                            <img
                              src={this.state.categoriesInfo.imgUrl}
                              className="img-fluid mt-4"
                              alt=""
                            />
                            <div className="text-center mt-1">
                              <MDBBtn
                                className="delete-btn"
                                onClick={this.handleImageDelete}
                              >
                                מחק
                          </MDBBtn>
                            </div>
                          </div>
                        ) : (
                            <div className="text-center white-text mt-3">
                              <input
                                style={{ color: "white !important" }}
                                type="file"
                                onChange={this.fileSelectedHandler}
                              />
                            </div>
                          )}

                        <div className="form-row"></div>
                        <div className="text-center mt-1">
                          <MDBBtn type="submit">שלח</MDBBtn>
                        </div>
                      </form>
                    </MDBContainer>
                  </div>
                )}
            </div>
          )}
      </div>
    );
  }
}

export default NewDog;
