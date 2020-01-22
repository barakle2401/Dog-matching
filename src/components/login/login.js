import React from "react";
import "./login.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";

const Login = () => {
  return (
    <div className="main-login">
      <MDBContainer className=" py-5">
        <MDBRow>
          <MDBCol md="6">
            <MDBCard className="login-card">
              <MDBCardBody>
                <form action="/AllDogs">
                  <p className="h3 text-center text-light mb-4">Login in</p>
                  <div className="white-text">
                    <MDBInput
                      label="Type your email"
                      icon="envelope"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                    />
                    <MDBInput
                      label="Type your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                    />
                  </div>
                  <div className="text-center">
                    <MDBBtn type="submit">Login</MDBBtn>
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
