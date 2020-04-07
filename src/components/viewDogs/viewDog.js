import React, { Component } from "react";
import firebase from "../../firebase";
import {
    storage
} from "../../firebase";
import Loader from "react-loader-spinner";
import "./viewDog.css"
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBView, MDBIcon } from 'mdbreact';

class ViewDog extends React.Component {

    constructor(props) {

        super(props);
        this.state =
        {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        // check on previous state
        if (prevState !== this.state) {
            console.log(this.state);
        }
    }

    componentDidMount() {
        const ref = firebase.database().ref("DogsInfo/" + "-M3p0fw9TF0UiVgXM9Pv");
        ref.on("value", snapshot => {
            const state = snapshot.val();

            this.setState(state);
        });

    }


    render() {
        return (
            <MDBRow className="justify-content-center dog-profile">
                <MDBCol md='5'>
                    <MDBCard >

                        <MDBRow className="mb-4 justify-content-center mt-5">
                            <MDBCol md="6">
                                <MDBCardImage

                                    hover
                                    overlay='white-slight'
                                    className='card-img-top img-thumbnail'
                                    src={this.state.imgUrl}

                                />
                            </MDBCol>
                        </MDBRow>

                        <MDBCardBody>
                            <h2 className='pink-text text-right'>
                                {this.state.name}
                            </h2>

                            <MDBCardTitle className='font-weight-bold'>
                                Cheat day inspirations
                    </MDBCardTitle>

                            <MDBCardText>
                                {this.state.dogDesc}
                            </MDBCardText>

                            <MDBBtn color='unique'>Button</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>


            </MDBRow>
        )
    }

}
export default ViewDog;