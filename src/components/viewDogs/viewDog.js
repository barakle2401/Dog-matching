import React, { Component } from "react";
import firebase from "../../firebase";
import {
    storage
} from "../../firebase";
// import Loader from "react-loader-spinner";
import "./viewDog.css"
import { MDBBtn, MDBProgress, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBRow, MDBCol } from 'mdbreact';

class ViewDog extends React.Component {

    constructor(props) {

        super(props);
        console.log(props.location.state);
        this.state = { dogDetails: props.location.state.dogDetails, readyToDisplay: false }

    }

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

        //dogs match data
        const { energy, focus, confidence, independence } = this.state.dogDetails;
        let totalMatch = {};

        totalMatch["energy"] = parseInt(100 * (1 - Math.abs(parseFloat(energy) - parseFloat(this.state.userMatchPercents["energy"])).toFixed(2)));
        totalMatch["focus"] = parseInt(100 * (1 - Math.abs(parseFloat(focus) - parseFloat(this.state.userMatchPercents["focus"])).toFixed(2)));
        totalMatch["confidence"] = parseInt(100 * (1 - Math.abs(parseFloat(confidence) - parseFloat(this.state.userMatchPercents["confidence"])).toFixed(2)));
        totalMatch["independence"] = parseInt(100 * (1 - Math.abs(parseFloat(independence) - parseFloat(this.state.userMatchPercents["independence"])).toFixed(2)));

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