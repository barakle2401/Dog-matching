import React from "react";
import "./login.css";
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

const Login = props => {
  return (
    <div className="main-login">
      <MDBContainer className=" py-5">
        <MDBRow>
          <MDBCol md="6">
            <MDBCard className="login-card">
              <MDBCardBody>
                <form action="/AllDogs">
                  <p className="h3 text-center text-light mb-4">
                    Sign in with Google
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

export default Login;
