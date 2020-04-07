import React from "react";
import firebase from "../../firebase";
import {
  storage
} from "../../firebase";
import SweetAlert from "sweetalert2-react";
import Loader from "react-loader-spinner";
import _ from "lodash";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBFormInline, MDBInput } from 'mdbreact';
import "./new_dog_form.css"
class NewDogForm extends React.Component {


  constructor() {

    super();
    this.state =
    {
      submitting: false,
      name: "",
      age: "",
      contactPhone: "",
      contactName: "",
      dogDesc: "",
      imgUrl: "",
      image: ""
    }
  }

  handleChange = e => {

    this.setState({ [e.target.id]: e.target.value });
  };
  fileSelectedHandler = e => {

    this.setState({ image: e.target.files[0] });
  };
  handleImageDelete = () => {
    this.setState({ imgUrl: "", image: "" });
  };
  handleFireBaseUpload = e => {
    let { image } = this.state;

    //start upload
    this.setState({ submitting: true });
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
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(fireBaseUrl => {
            this.setState(prevObject => ({
              ...prevObject,
              imgUrl: fireBaseUrl, submitting: false
            }));
            //  this.setState({ categoriesInfo: categoriesInfo, imageOnUpload: false });
          });
      }
    );
  };
  handleSubmit = async e => {
    e.preventDefault(); // <- prevent form submit from reloading the page
    e.target.className += " was-validated";
    //Add validation here


    this.setState({ submitting: true });
    //console.log(this.state);




    await firebase
      .database()
      .ref("/DogsInfo")
      .push(this.state, function (error) {
        if (error) {
          console.log("The write failed...");
        } else {
          // Data saved successfully!!!
          console.log("Data saved successfully!");
          confirmAlert({
            title: 'הכלב עלה בהצלחה לאתר',
            message: 'תודה',
            buttons: [
              {
                label: 'OK',
                onClick: () => window.location = "/"
              }
            ]
          });


        }
      });

    this.setState({ submitting: false });

  };
  isFormValid = () => {

    const { name, age, contactPhone, contactName, energy, independence, focus, confidence, dogDesc } = this.state;

    if (!name) {

    }


    return false;

  }
  render() {

    return (

      <div className="form-main-div">
        {this.state.submitting ? (<div className="main-page">
          <MDBContainer className="py-5">
            <MDBRow className="main-content">
              <MDBCol md="6 d-flex justify-content-center">
                <MDBRow className="buttons-div">
                  <h1>Uploading...</h1>
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
        </div>) : (<MDBContainer>
          <MDBRow className="justify-content-center mt-5">
            <MDBCol xs="12" md="10">
              <MDBCard>
                <MDBCardBody>
                  <form onSubmit={this.handleSubmit} className="form-new-dog needs-validation" noValidate>
                    <p className="h4 text-center py-4">טופס כלב חדש</p>
                    <MDBRow className="justify-content-center">

                      <MDBCol xs="12" md="5" className=" text-center">
                        <label
                          htmlFor="name"
                          className="grey-text font-weight-light "
                        >
                          שם הכלב
                                      </label>
                        <input
                          value={this.state.name}
                          onChange={this.handleChange}
                          type="text"
                          id="name"
                          className="form-control"
                          required
                        />
                        <div className="invalid-feedback">
                          אנא הזן את שם הכלב
                        </div>
                      </MDBCol>
                      <MDBCol xs="12" md="5" className="text-center">
                        <label
                          htmlFor="age"
                          className="grey-text font-weight-light "
                        >
                          גיל
                                      </label>
                        <input
                          value={this.state.age}
                          onChange={this.handleChange}
                          type="number"
                          id="age"
                          className="form-control"
                          required
                        />
                        <div className="invalid-feedback">
                          אנא הזן את גיל הכלב
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="justify-content-center mt-3">
                      <MDBCol xs="12" md="5" className=" text-center">
                        <label
                          htmlFor="contactName"
                          className="grey-text font-weight-light "
                        >
                          איש קשר - שם מלא
                                      </label>
                        <input
                          value={this.state.contactName}
                          onChange={this.handleChange}
                          type="text"
                          id="contactName"
                          className="form-control"
                          required
                        />
                        <div className="invalid-feedback">
                          אנא הזן איש קשר
                        </div>
                      </MDBCol>
                      <MDBCol xs="12" md="5" className="text-center">
                        <label
                          htmlFor="name"
                          className="grey-text font-weight-light "
                        >
                          טלפון ליצירת קשר
                                      </label>
                        <input
                          value={this.state.contactPhone}
                          onChange={this.handleChange}
                          type="tel"
                          id="contactPhone"
                          className="form-control"
                          required
                        />
                        <div className="invalid-feedback">
                          אנא הזן טלפון
                        </div>
                      </MDBCol>

                    </MDBRow>
                    <br />
                    <p className="h6 text-center py-1">אנא דרג את הכלב בכל אחת מהקטגוריות הבאות</p>
                    <hr style={{ maxWidth: "60%" }} />
                    <MDBRow className="justify-content-center mt-3">

                      <MDBCol xs="12" md="5" className="text-center">
                        <label
                          htmlFor="independence"
                          className="grey-text font-weight-light "
                        >
                          עצמאות
                                      </label>
                        <select required value={this.state.independence} onChange={this.handleChange} className="browser-default custom-select" id="independence" >
                          <option value="" disabled selected>בחר</option>
                          {_.range(1, 11).map(value => (
                            <option value={value}>{value}</option>
                          ))}
                        </select>
                        <div className="invalid-feedback">
                          אנא בחר את רמת העצמאות של הכלב
                        </div>
                      </MDBCol>
                      <MDBCol xs="12" md="5" className=" text-center">
                        <label
                          htmlFor="energy"
                          className="grey-text font-weight-light "
                        >
                          אנרגיה
                                      </label>
                        <select required value={this.state.energy} onChange={this.handleChange} className="browser-default custom-select" id="energy" >
                          <option value="" disabled selected>בחר</option>
                          {_.range(1, 11).map(value => (
                            <option value={value}>{value}</option>
                          ))}
                        </select>
                        <div className="invalid-feedback">
                          אנא בחר את רמת האנרגיה של הכלב
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="justify-content-center mt-3">
                      <MDBCol xs="12" md="5" className=" text-center">
                        <label
                          htmlFor="focus"
                          className="grey-text font-weight-light "
                        >
                          מסוגלות למלא פקודות
                                      </label>
                        <select required value={this.state.focus} onChange={this.handleChange} className="browser-default custom-select" id="focus" >
                          <option value="" disabled selected>בחר</option>
                          {_.range(1, 11).map(value => (
                            <option value={value}>{value}</option>
                          ))}
                        </select>
                        <div className="invalid-feedback">
                          אנא הזן את רמת היכולת של הכלב למלא פקודות
                         </div>
                      </MDBCol>
                      <MDBCol xs="12" md="5" className="text-center">
                        <label
                          htmlFor="confidence"
                          className="grey-text font-weight-light "
                        >
                          ביטחון עצמי
                                      </label>
                        <select required value={this.state.confidence} onChange={this.handleChange} className="browser-default custom-select" id="confidence" >
                          <option value="" disabled selected>בחר</option>
                          {_.range(1, 11).map(value => (
                            <option value={value}>{value}</option>
                          ))}
                        </select>
                        <div className="invalid-feedback">
                          אנא בחר את רמת הביטחון העצמי של הכלב
                         </div>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="justify-content-center mt-3">
                      <MDBCol xs="12" md="8" className=" text-center">
                        <div className="form-group">
                          <label htmlFor="dogDesc" className="grey-text font-weight-light ">
                            פרטים נוספים
                                      </label>
                          <textarea
                            value={this.state.dogDesc}
                            onChange={this.handleChange}
                            className="grey-text font-weight-light form-control"
                            id="dogDesc"
                            rows="4"
                          />
                        </div>
                      </MDBCol></MDBRow>
                    <MDBRow className="justify-content-center mt-3">
                      <MDBCol xs="12" md="8" className=" text-center">
                        {this.state.imgUrl ? (
                          <div className="form-row d-flex justify-content-center p-5">
                            <img
                              src={this.state.imgUrl}
                              className="img-fluid mt-4"
                              alt=""
                            />
                            <div className="text-center mt-1">
                              <MDBBtn

                                className="delete-btn"
                                onClick={this.handleImageDelete}
                              >
                                החלף תמונה
                                        </MDBBtn>
                            </div>
                          </div>
                        ) : (
                            <div className="text-center image-section">
                              <label htmlFor="desc" className="grey-text font-weight-light ">
                                הוספת תמונה
                                      </label>

                              <MDBInput
                                type="file"

                                onChange={this.fileSelectedHandler}
                              />
                              <MDBBtn

                                onClick={this.handleFireBaseUpload}
                              >
                                שמור תמונה
                                </MDBBtn>
                            </div>
                          )}

                      </MDBCol>
                    </MDBRow>
                    <div className="text-center py-4 mt-3">
                      <MDBBtn className="btn btn-outline-purple" type="submit">
                        שלח
                                          <MDBIcon far icon="paper-plane" className="ml-2" />
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>)}
      </div>

    );
  }
}
export default NewDogForm;