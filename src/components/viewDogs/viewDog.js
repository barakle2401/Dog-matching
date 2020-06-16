import React, { Component } from "react";
import firebase from "../../firebase";
import "./viewDog.css"
import { MDBBtn, MDBProgress, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBView, MDBIcon } from 'mdbreact';

/*CONSTANTS*/
const THRESHOLD_VALUE_FOCUS = 0.7;
const THRESHOLD_VALUE_INDEPENDENCE = 0.8;
const THRESHOLD_VALUE_CONFIDENCE = 0.8;

class ViewDog extends React.Component {

    constructor(props) {

        super(props);
        // console.log(props.location.state);
        this.state = { dogDetails: props.location.state.dogDetails, readyToDisplay: false }

    }

    // componentDidUpdate(prevProps, prevState) {
    //     // check on previous state
    //     if (prevState !== this.state) {
    //         console.log(this.state);
    //     }
    // }

    componentDidMount() {
        if (this.props.location.state.uid) {
            const ref = firebase.database().ref("users/" + this.props.location.state.uid + "/answers");
            ref.on("value", snapshot => {
                const data = snapshot.val();
                console.log(data);
                this.setState({ userMatchPercents: data });

            });

        }


    }
    componentDidUpdate(prevProps, prevState) {
        // check on previous state
        if (prevState !== this.state) {

            console.log(this.state);
            if (!this.state.readyToDisplay) {

                this.calculateMatch();
            }

        }
    }

    calculateMatch = () => {

        let totalMatch = {};

        //dogs match data
        const { energy, focus, confidence, independence } = this.state.dogDetails;
        const userEnergy = parseFloat(this.state.userMatchPercents["energy"]);
        const userFocus = parseFloat(this.state.userMatchPercents["focus"]);
        const userIndependence = parseFloat(this.state.userMatchPercents["independence"]);
        const userConfidence = parseFloat(this.state.userMatchPercents["independence"]);






        //On energy direct calculation
        totalMatch["energy"] = parseInt(100 * (1 - Math.abs(parseFloat(energy) - userEnergy).toFixed(2)));

        //Focus 
        if (userFocus >= THRESHOLD_VALUE_FOCUS) {

            totalMatch["focus"] = parseInt((100 * userFocus).toFixed(2));

        } else {

            //Direct calculation  
            totalMatch["focus"] = parseInt(100 * (1 - Math.abs(parseFloat(focus) - userFocus).toFixed(2)));
        }

        //Independence 
        if (userIndependence >= THRESHOLD_VALUE_INDEPENDENCE || independence >= THRESHOLD_VALUE_INDEPENDENCE) {

            totalMatch["independence"] = parseInt((100 * Math.max(userIndependence, parseFloat(independence))).toFixed(2));

        } else {

            //Direct calculation   
            totalMatch["independence"] = parseInt(100 * (1 - Math.abs(parseFloat(independence) - userIndependence).toFixed(2)))
        }

        //Confidence 
        if (userConfidence >= THRESHOLD_VALUE_CONFIDENCE || confidence >= THRESHOLD_VALUE_CONFIDENCE) {

            totalMatch["confidence"] = parseInt((100 * Math.max(userConfidence, parseFloat(confidence))).toFixed(2));

        } else {

            //Direct calculation   
            totalMatch["confidence"] = parseInt(100 * (1 - Math.abs(parseFloat(confidence) - userConfidence).toFixed(2)))
        }


        console.log(totalMatch);
        this.setState({ totalMatch: totalMatch, readyToDisplay: true });
    }
    render() {
        return (
            <MDBRow className="justify-content-center dog-profile mt-5 mb-5">
                <MDBCol xl="11" lg='12' md='12' sm="12">
                    <MDBCard >
                        <MDBRow >
                            <MDBCol md="2"><h3 className="dog-name text-right" >{this.state.dogDetails.name} </h3></MDBCol>
                        </MDBRow>
                        <MDBRow className="mb-1 justify-content-start mt-1">
                            <MDBCol md="4">
                                <h5 className='text-right mr-2 mt-2 '>
                                    אחוז התאמה כולל : <span className='green-text font-weight-bold'> {this.state.dogDetails.totalMatchPercent + "%"} </span>
                                </h5>
                                <h5 className='text-right  mr-2 mt-2'>
                                    פרטים :
                                </h5>
                                <div className="list mr-2">
                                    <dl>
                                        <dt>שם:</dt>
                                        <dd>{this.state.dogDetails.name}</dd>
                                        <dt>גיל:</dt>
                                        <dd>{this.state.dogDetails.age}</dd>
                                        <dt>גודל:</dt>
                                        <dd>{this.state.dogDetails.size}</dd>
                                        <dt>גזע:</dt>
                                        <dd>{this.state.dogDetails.breed}</dd>
                                        <dt>מין:</dt>
                                        <dd>{this.state.dogDetails.sex}</dd>
                                        <dt>עמותה / איש קשר:</dt>
                                        <dd>{this.state.dogDetails.contactName} - {this.state.dogDetails.contactPhone}</dd>
                                        <dt>העדפות:</dt>
                                        <dd>{this.state.dogDetails.preferences}</dd>
                                    </dl>
                                </div>
                            </MDBCol>
                            <MDBCol md="3">
                                <h5 className='text-right  mr-2 mt-2'>
                                    על    {this.state.dogDetails.name}:
                                </h5>
                                <MDBCardText className="text-right  mr-2">
                                    {this.state.dogDetails.dogDesc}
                                </MDBCardText>
                            </MDBCol>
                            <MDBCol md="4">
                                <MDBCardImage

                                    hover
                                    overlay='white-slight'
                                    className='card-img-top img-thumbnail dog-image'
                                    src={this.state.dogDetails.imgUrl}

                                />
                            </MDBCol>

                        </MDBRow>

                        <MDBCardBody>

                            <MDBRow className="mt-1">
                                <MDBCol className="text-right font-weight-bold">
                                    <h5> אחוז התאמה לפי קטגוריות :</h5>
                                    <hr style={{ width: "20%", float: "right" }} />
                                </MDBCol>
                            </MDBRow>
                            {this.state.readyToDisplay ? (<>
                                <MDBRow className="mt-1">
                                    <MDBCol className="text-center">
                                        <span className="font-weight-bold" >אנרגיה</span>
                                        <MDBProgress material value={this.state.totalMatch.energy} height="20px">
                                            %  {this.state.totalMatch.energy}
                                        </MDBProgress>
                                    </MDBCol>
                                    <MDBCol className="text-center">
                                        <span className="font-weight-bold" >עצמאות</span>
                                        <MDBProgress material value={this.state.totalMatch.independence} height="20px">
                                            %  {this.state.totalMatch.independence}
                                        </MDBProgress>
                                    </MDBCol>


                                </MDBRow>
                                <MDBRow className="mt-2">
                                    <MDBCol className="text-center">
                                        <span className="font-weight-bold " >ביטחון  <br />עצמי</span>
                                        <MDBProgress material value={this.state.totalMatch.confidence} height="20px">
                                            %  {this.state.totalMatch.confidence}
                                        </MDBProgress>
                                    </MDBCol>
                                    <MDBCol className="text-center">
                                        <span className="font-weight-bold" >מסוגלות <br /> למלא פקודות</span>
                                        <MDBProgress material value={this.state.totalMatch.focus} height="20px">
                                            %  {this.state.totalMatch.focus}
                                        </MDBProgress>
                                    </MDBCol>
                                </MDBRow>
                            </>) : ("")}

                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>


            </MDBRow>
        )
    }

}
export default ViewDog;