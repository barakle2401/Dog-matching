import React from "react";
import "./loginForm.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon
} from "mdbreact";

const LoginForm = props => {
  return (
    <div className="main-login">
      <MDBContainer className=" py-5">
        <MDBRow>
          <MDBCol md="6">
            <MDBCard className="login-card">
              <MDBCardBody>
                <form action="/AllDogs">
                  <p className="h3 text-center text-light mb-4">
                    על מנת להציג עבורך את תוצאות השאלון
                  </p>
                  <p className="h3 text-center text-light mb-4">
                    נצטרך שתבצע התחברות קלה למערכת{" "}
                  </p>
                  <div className="text-center">
                    <MDBBtn onClick={props.signIn}>
                      {" "}
                      <MDBIcon fab icon="google" /> Sign In
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default LoginForm;
