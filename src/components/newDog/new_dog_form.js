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
import { MDBContainer,MDBCloseIcon , MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBFormInline, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import "./new_dog_form.css"
class NewDogForm extends React.Component {


  constructor() {

    super();
    this.state =
    {
      modal: false,
      submitting: false,
      name: "",
      age: "",
      contactPhone: "",
      contactName: "",
      dogDesc: "",
      imgUrl: "",
      image: "",
      size:"",
      breed:"",
      preferences: "",
      expectedPercent:"",
      sex:"",
      width: window.innerWidth
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }
  
  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }
  
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
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


    // async magic goes here...
    if (image === "") {
      console.error(`not an image, the image file is a ${typeof image}`);
      confirmAlert({
        title: 'אנא בחר תמונה',
      
        buttons: [
          {
            label: 'OK',
      
          }
        ]
      });
      return;
    }
    //start upload
    this.setState({ submitting: true });
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
        confirmAlert({
          title: 'התרחשה שגיאה אנא נסה שוב',
        
          buttons: [
            {
              label: 'OK',
            
            }
          ]
        });
        this.setState({submitting:false});
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
              imgUrl: fireBaseUrl, submitting: false
            }));
            //  this.setState({ categoriesInfo: categoriesInfo, imageOnUpload: false });
          });
      }
    );
  };
  handleSubmit = async e => {
     e.preventDefault(); // <- prevent form submit from reloading the page
     const { width } = this.state;
     const isMobile = width <= 500;
     //MDB validation works only on desktop display 
     if(!isMobile){
      e.target.className += " was-validated";
     }
    if (!this.isFormValid()) {
      
      if(isMobile){
        confirmAlert({
          title: 'אנא מלא את כל השדות בבקשה',
          message: 'תודה',
          buttons: [
            {
              label: 'OK',
            
            }
          ]
        });
        
      }
      return;
    }
      this.setState({ submitting: true });
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
    //console.log(name, age, contactPhone, contactName, energy, independence, focus, confidence, dogDesc);
    if (!name || !age || !contactPhone || !energy || !independence || !focus || !confidence || !dogDesc) {
      return false;
    }


    return true;

  }
  render() {

    return (

      <div className="form-main-div">
        {this.state.submitting ? (<div className="loader-wrapper border-danger d-flex justify-content-center">
         
         
              
                <div className="text-center ">
                  <h1 className="loader-text" >Uploading Please Wait...     <Loader
                    type="ThreeDots"
                    color="#ff00b3 "
                    height={150}
                    width={250}
                  /></h1>
             
                </div>
              
           
         
        </div>) : (<div>
          {this.state.modal ? (
            <MDBContainer>

              <MDBModal size="lg" isOpen={this.state.modal} toggle={this.toggle}>

                <MDBModalBody className="modal-explain" >
                <MDBCloseIcon onClick={this.toggle} />
                  <div className="mb-5">
                  <h3 className="text-right main-title"> כיצד המערכת עובדת? </h3>
                  <h6 className="text-right sub-title"> מערכת ההתאמה מתחשבת ב 4 מאפיינים עיקריים של הכלב </h6>
                  <hr />
                </div>
                
                  <div>
                    <MDBRow>
                      <MDBCol    className="quarter">

                        <p className="quarter-title"> עצמאות  </p>
                        <p className="text-justify">מדד זה מתייחס לרמת העצמאות שמפגין הכלב בביתו ולמידה בה הוא זקוק להבעות חיבה מצד בעליו. כלב בעל רמת עצמאות גבוהה, יהיה מסוגל להסתדר זמן ממושך בבית, אינו תלוי בהבעות חיבה של בעליו ומסתפק במעט ליטופים. לעומת זאת כלב בעל רמת עצמאות נמוכה זקוק להפגנות חיבה, ליטופים, התכרבלות ומגע פיזי רב מצד בעליו. 
                        
                        
                        </p>
                      </MDBCol>
                      <MDBCol   className="quarter">
                        <p className="quarter-title"> אנרגיה</p>
                        <p className="text-justify">
                        מדד זה בא לבטא את רמת האנרגיה של הכלב הן הפיזית והן המנטלית. כלב בעל רמת אנרגיה גבוהה יצטרך פעילות גופנית ומנטלית על בסיס יום יומי, לעומת כלב בעל רמת אנרגיה נמוכה אשר מעדיף את חיי הבית והרביצה.                        
                        
                        </p>
                      </MDBCol>

                    </MDBRow>
                    <MDBRow>
                      <MDBCol  className="quarter ">
                        <p className="quarter-title"> מסוגלות למלא פקודות</p>
                        <p className="text-justify">
                        מדד זה בא לבטא את רמת המסוגלות של הכלב למלא אחר פקודות, כלב בעל ריכוז ואינטליגנציה גבוהה יציית יותר לבעליו לעומת כלב שמאבד ריכוז בקלות ומעדיף לשחק עם כלבים אחרים למשל מאשר להישמע לבעליהם.                         
                        </p>
                      </MDBCol>
                      <MDBCol  className="quarter">
                        <p className="quarter-title"> ביטחון עצמי</p>
                        <p className="text-justify">
                        מדד זה בא לבטא את רמת הביטחון העצמי של הכלב במצבים שונים בסביבתו. כלב בעל ביטחון עצמי גבוה יסתגל בקלות לסיטואציות חדשות ובמפגש עם אנשים וכלבים חדשים. לעומת זאת, כלב בעל ביטחון עצמי נמוך, נוטה להיות חשדן ולהיבהל בקלות וזקוק להדרכה וסבלנות במצבים שונים ובמפגש עם כלבים חדשים.                        </p>
                      </MDBCol>

                    </MDBRow>
                  </div>


                </MDBModalBody>

              </MDBModal>
            </MDBContainer>) : (
              <MDBContainer>
                
                <MDBRow className="justify-content-center mt-5">
              
                  <MDBCol xs="12" md="9" xl="10">
                    <MDBCard className="form-card">
                      <MDBCardBody>
                        <form onSubmit={this.handleSubmit} className="form-new-dog needs-validation" noValidate>
                           <div className="d-flex">
                           <p className="h2 title-text  text-right py-4">טופס כלב חדש</p>

                            <i className="icon-dog" src="../images/icons/dog"/>
                           </div>
                          
                          <MDBRow className="justify-content-center">

                            <MDBCol xs="12" md="5" className="text-right">
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
                            <MDBCol xs="12" md="5" className="text-right">
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
                            <MDBCol xs="12" md="5" className=" text-right">
                              <label
                                htmlFor="contactName"
                                className="grey-text font-weight-light "
                              >
                              איש קשר / עמותה - שם מלא
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
                            <MDBCol xs="12" md="5" className="text-right">
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
                                maxLength="12"
                                id="contactPhone"
                                className="form-control"
                                required
                              />
                              <div className="invalid-feedback">
                                אנא הזן טלפון
                        </div>
                            </MDBCol>

                          </MDBRow>
                          <MDBRow className="justify-content-center mt-3">
                            <MDBCol xs="12" md="5" className=" text-right">
                              <label
                                htmlFor="contactName"
                                className="grey-text font-weight-light "
                              >
                                 גזע
                                      </label>
                              <input
                                value={this.state.breed}
                                onChange={this.handleChange}
                                type="text"
                                id="breed"
                                className="form-control"
                                required
                              />
                              <div className="invalid-feedback">
                                אנא הזן גזע
                        </div>
                            </MDBCol>
                            <MDBCol xs="12" md="5" className=" text-right">
                              <label
                                htmlFor="energy"
                                className="grey-text font-weight-light "
                              >
                               גודל
                                      </label>
                              <select required value={this.state.size} onChange={this.handleChange} className="browser-default custom-select" id="size" >
                                <option value="" disabled selected>בחר</option>
                                <option value="קטן" >קטן</option>
                                <option value="בינוני">בינוני</option>
                                <option value="גדול">גדול</option>
                              </select>
                              <div className="invalid-feedback">
                                אנא בחר את גודל הכלב
                                                        </div>
                            </MDBCol>

                          </MDBRow>
                          <MDBRow className="justify-content-center mt-3">
                          <MDBCol xs="12" md="5" className=" text-right">
                              <label
                                htmlFor="energy"
                                className="grey-text font-weight-light "
                              >
                               מין
                                      </label>
                              <select required value={this.state.sex} onChange={this.handleChange} className="browser-default custom-select" id="sex" >
                                <option value="" disabled selected>בחר</option>
                                <option value="זכר" >זכר</option>
                                <option value="נקבה">נקבה</option>
                          
                              </select>
                              <div className="invalid-feedback">
                               אנא הזן את מין הכלב
                                                        </div>
                            </MDBCol>

                          <MDBCol xs="12" md="5" className=" text-right">
                              <label
                                htmlFor="contactName"
                                className="grey-text font-weight-light "
                              >
                                 העדפות
                                      </label>
                              <input
                                value={this.state.preferences}
                                onChange={this.handleChange}
                                type="text"
                                id="preferences"
                                className="form-control"
                                placeholder="מסתדר עם / חתולים /כלבים / ילדים... "
                              />
                         
                            </MDBCol>
                            
                            
                              
                            </MDBRow>
                          <br />
                        <p className="h6 grey-text text-center py-1">  אנא דרג את הכלב בכל אחת מהקטגוריות הבאות <MDBBtn className="btn-sm mr-5" color="secondary" onClick={this.toggle}>  הסבר כיצד זה עובד</MDBBtn></p>
                          <hr className="hr"/>
                          <MDBRow className="justify-content-center mt-3">

                            <MDBCol xs="12" md="5" className="text-right">

                              <label
                                htmlFor="independence"
                                className="grey-text font-weight-light "
                              >
                                עצמאות
                                      </label>
                              <select required value={this.state.independence} onChange={this.handleChange} className="browser-default custom-select" id="independence" >
                                <option value="" disabled selected>בחר</option>
                                {_.range(1, 11).map(value => (
                                  <option value={value / 10}>{value}</option>
                                ))}
                              </select>
                              <div className="invalid-feedback">
                                אנא בחר את רמת העצמאות של הכלב
                        </div>
                            </MDBCol>
                            <MDBCol xs="12" md="5" className=" text-right">
                              <label
                                htmlFor="energy"
                                className="grey-text font-weight-light "
                              >
                                אנרגיה
                                      </label>
                              <select required value={this.state.energy} onChange={this.handleChange} className="browser-default custom-select" id="energy" >
                                <option value="" disabled selected>בחר</option>
                                {_.range(1, 11).map(value => (
                                  <option value={value / 10}>{value}</option>
                                ))}
                              </select>
                              <div className="invalid-feedback">
                                אנא בחר את רמת האנרגיה של הכלב
                        </div>
                            </MDBCol>
                          </MDBRow>
                          <MDBRow className="justify-content-center mt-3">
                            <MDBCol xs="12" md="5" className=" text-right">
                              <label
                                htmlFor="focus"
                                className="grey-text font-weight-light "
                              >
                                מסוגלות למלא פקודות
                                      </label>
                              <select required value={this.state.focus} onChange={this.handleChange} className="browser-default custom-select" id="focus" >
                                <option value="" disabled selected>בחר</option>
                                {_.range(1, 11).map(value => (
                                  <option value={value / 10}>{value}</option>
                                ))}
                              </select>
                              <div className="invalid-feedback">
                                אנא הזן את רמת היכולת של הכלב למלא פקודות
                         </div>
                            </MDBCol>
                            <MDBCol xs="12" md="5" className="text-right">
                              <label
                                htmlFor="confidence"
                                className="grey-text font-weight-light "
                              >
                                ביטחון עצמי
                                      </label>
                              <select required value={this.state.confidence} onChange={this.handleChange} className="browser-default custom-select" id="confidence" >
                                <option value="" disabled selected>בחר</option>
                                {_.range(1, 11).map(value => (
                                  <option value={value / 10}>{value}</option>
                                ))}
                              </select>
                              <div className="invalid-feedback">
                                אנא בחר את רמת הביטחון העצמי של הכלב
                         </div>
                            </MDBCol>
                          </MDBRow>
                          <MDBRow className="justify-content-center mt-3">
                          <MDBCol xs="12" md="5" className=" text-right">
                              <div className="form-group">
                                <label htmlFor="expectedPercent" className="red-text font-weight-light ">
                                    אחוז התאמה צפוי - לצורך בדיקות
                                      </label>
                                  <input
                                  value={this.state.expectedPercent}
                                  onChange={this.handleChange}
                                  type="number"
                                  id="expectedPercent"
                                  className="form-control"
                                  placeholder="אנא הזן את אחוז ההתאמה הצפוי שלך אל מול הכלב - לצורך בדיקה "
                                />
                              </div>
                            </MDBCol>
                          </MDBRow>
                          <MDBRow className="justify-content-center mt-3">
                            <MDBCol xs="12" md="8" className=" text-right">
                              <div className="form-group">
                                <label htmlFor="dogDesc" className="grey-text font-weight-light ">
                                  פרטים נוספים
                                      </label>
                                <textarea
                                  value={this.state.dogDesc}
                                  onChange={this.handleChange}
                                  className="dark-text font-weight-light form-control"
                                  id="dogDesc"
                                  rows="4"
                                />
                              </div>
                            </MDBCol></MDBRow>
                          <MDBRow className="justify-content-center mt-3">
                            <MDBCol xs="12" md="8" className=" text-right">
                              {this.state.imgUrl ? (
                                <div className="form-row d-flex justify-content-center p-5">
                                  <img
                                    src={this.state.imgUrl}
                                    className="img-fluid mt-4"
                                    alt=""
                                  />
                                  <div className="text-right mt-1">
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
                                      className="file-inpt"
                                      onChange={this.fileSelectedHandler}
                                    />
                                    <MDBBtn
                                      className="btn-md save-image-btn"
                                      onClick={this.handleFireBaseUpload}
                                    >
                                      שמור תמונה
                                </MDBBtn>
                                  </div>
                                )}

                            </MDBCol>
                          </MDBRow>
                          <div className="text-center py-4 mt-3">
                            <MDBBtn className="btn submit-btn" type="submit">
                              שלח
                                          <MDBIcon far icon="paper-plane" className="mr-2" />
                            </MDBBtn>
                          </div>
                        </form>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>)}
        </div>
          )}

      </div>

    );
  }
}
export default NewDogForm;