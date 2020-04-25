//===============================================================================
//Main page component redirect to quiz, new dog form, view dogs
//===============================================================================
import React from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import "./mainPage.css"
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,MDBCloseIcon,
  MDBIcon,
  MDBFooter, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter
} from "mdbreact";

import "firebase/auth";

class MainPage extends React.Component {
  constructor() {
    super();
    this.state ={modal:false,uid:""}
   
  }  
  componentDidMount() {
    // var user = firebase.auth().currentUser;
    // if (user) {
    //   var name, email, photoUrl, uid, emailVerified;
    //   name = user.displayName;
    //   email = user.email;
    //   photoUrl = user.photoURL;
    //   emailVerified = user.emailVerified;
    //   uid = user.uid;
    //  this.setState({uid:uid});
    //  console.log("hi");
    // }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user logged');
        console.log(user.photoURL);
         this.setState({uid:user.uid,userImageUrl:user.photoURL});
        
      }
   });
 
  }

  redirectToGallery = () =>{
    console.log(this.state);



  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    //console.log(this.state.user);
    return (
      <div className="main-page">
       {

         this.state.modal ? ( <MDBContainer>

          <MDBModal size="lg" isOpen={this.state.modal} toggle={this.toggle}>
      
            <MDBModalBody className="modal-explain">
            <MDBCloseIcon onClick={this.toggle} />
              <div className="mb-5">
              <h3 className="text-center main-title"> כיצד המערכת עובדת? </h3>
              <h6 className="text-center sub-title"> מערכת ההתאמה מתחשבת ב 4 מאפיינים עיקריים של הכלב </h6>
              <hr />
              
            </div>
            
              <div>
                <MDBRow>
                  <MDBCol className="quarter " >

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
        </MDBContainer>) :( <MDBContainer className="py-5">
  

     
           <MDBRow className="title-row justify-content-center text-center mb-3">
 
             <h1 id="title">התאם לי חבר</h1>
        
             </MDBRow>
         
             <MDBRow className="buttons-div justify-content-center">
            
               <Link to="/login-form">
                 <MDBBtn className="quiz-button-start mt-5">
               <span className="d-block d-sm-none">  {" התחל "}</span>  שאלון התאמה
                 </MDBBtn>
               </Link>

               <Link to="/new-dog-form">
                 <MDBBtn className="quiz-button-form mt-5">
                   טופס הוספת כלב
                 </MDBBtn>
               </Link>
             </MDBRow>{" "}
    
   
         <MDBFooter>
           <MDBCol md="6 d-flex justify-content-center">
             <MDBRow className="mt-5 how-it-works">
               <a onClick={this.toggle}>
                 <MDBIcon className="info-icon mr-2" icon="info-circle">
               
                 </MDBIcon>      
                 <small>איך זה עובד{"    "} </small>   
               </a>
             </MDBRow>
           </MDBCol>
           <MDBCol md="6 d-flex justify-content-center bottom-buttons-section">
             <MDBRow className="mt-5">
               <a className="d-none">
                 <Link to="/login">
                   <MDBBtn className="login-button mt-5">היית פה? התחבר</MDBBtn>
                 </Link>
               </a>
               <div className="mt-5">
               {(this.state.uid) ? ( <Link   to={{ pathname: "/dogs-gallery", state: { uid: this.state.uid, userName: this.state.userName } }} > <a>
               
               <MDBBtn className="login-button" onClick={this.redirectToGallery}>צפייה בכלבים</MDBBtn>
          
           </a></Link>):(<></>)}</div>
             
             </MDBRow>
           </MDBCol>
         </MDBFooter>
       </MDBContainer>)
       }
       
      </div>
    );
  }
}
export default MainPage;
