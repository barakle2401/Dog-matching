import React from "react";
import firebase from "../../firebase";
import Gallery from "./gallery";
import { MDBRow, MDBContainer } from "mdbreact";
import LoaderSpinner from "../loader/loader"
import * as THRESHOLD_VALUES from "../../constants/threshold_values"
import "./gallery.css"
/*CONSTANTS*/
const THRESHOLD_VALUE_FOCUS = 0.7;
const THRESHOLD_VALUE_INDEPENDENCE = 0.8;
const THRESHOLD_VALUE_CONFIDENCE = 0.8;

class DogsGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { readyToDisplay: false, uid: props.location.state.uid }
    //this.state = { readyToDisplay: false, uid: "ZZg6TPfBJzOvmW67z9kDziPgL5x1" }

    //this.getDogsData();

  }
  componentDidMount() {

    this.getUserData();
    this.getDogsData();
  }
  componentDidUpdate(prevProps, prevState) {
    // check on previous state
    if (prevState !== this.state) {


      if (this.state.dogsInfo && this.state.userData && !this.state.readyToDisplay) {

        let dogsInfo = this.calculateMatch();

        this.setState({ dogsInfo: dogsInfo, readyToDisplay: true });

      }
    }
  }
  getUserData = () => {

    let ref = firebase.database().ref("users/" + this.state.uid + "/answers");

    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState({ userData: state });
    });
  };
  getDogsData = () => {
    let ref = firebase.database().ref("DogsInfo");
    ref.on("value", snapshot => {
      const state = Object.values(snapshot.val());
      this.setState({ dogsInfo: state });
    });
  };

  /*Loop over the dogs and calculate for each dog total match percent */
  calculateMatch = () => {

    let { dogsInfo, userData } = this.state;

    for (let i = 0; i < Object.keys(dogsInfo).length; i++) {

      //let totalMatchPercent = this.matchAlgorithmNew(dogsInfo[i].confidence, dogsInfo[i].energy, dogsInfo[i].focus, dogsInfo[i].independence, userData);
      let totalMatchPercent = this.matchAlgorithm(dogsInfo[i].confidence, dogsInfo[i].energy, dogsInfo[i].focus, dogsInfo[i].independence, userData);

      console.log("total percent:", (Math.round(totalMatchPercent * 100)));

      dogsInfo[i].totalMatchPercent = (Math.round(totalMatchPercent * 100));
    }


    return dogsInfo.sort(this.compare);
  }
  compare = (dogA, dogB) => {

    let dogAMatchPercent = parseFloat(dogA.totalMatchPercent);
    let dogBMatchPercent = parseFloat(dogB.totalMatchPercent);

    if (dogAMatchPercent < dogBMatchPercent) {

      return 1;
    }
    if (dogAMatchPercent > dogBMatchPercent) {

      return -1;
    }

  }

  matchAlgorithmNew(confidence, energy, focus, independence, userData) {

    let confidencePercent = parseFloat(this.calculateConfidenceNew(confidence, userData["confidence"]));
    let energyPercent = 1.5 * (1 - Math.abs(parseFloat(energy) - parseFloat(userData["energy"])).toFixed(2));
    let independencePercent = parseFloat(this.calculateIndependenceNew(independence, userData["independence"]));
    let focusPercent = 0.5 * (parseFloat(this.calculateFocusNew(focus, userData["focus"])));




    let totalPercent = (confidencePercent + energyPercent + independencePercent + focusPercent) / 4;

    console.log("userData:", userData)
    // console.log(confidence, energy, focus, independence)
    // console.log("confidencePercent:", confidencePercent, "energyPercent:", energyPercent, "independencePercent:", independencePercent, "focusPercent:", focusPercent)

    return totalPercent;
  }
  calculateIndependenceNew(dogIndependence, userIndependence) {

    //Direct calculation   
    return ((parseFloat(dogIndependence) + parseFloat(userIndependence)) / 2).toFixed(2)

  }

  calculateFocusNew(dogFocus, userFocus) {

    return ((parseFloat(dogFocus) + parseFloat(userFocus)) / 2).toFixed(2)

  }
  calculateConfidenceNew(dogConfidence, userConfidence) {
    //Confidence 
    return ((parseFloat(dogConfidence) + parseFloat(userConfidence)) / 2).toFixed(2)
  }


  matchAlgorithm(confidence, energy, focus, independence, userData) {

    let confidencePercent = parseFloat(this.calculateConfidence(confidence, userData["confidence"]));
    let energyPercent = 1.5 * (1 - Math.abs(parseFloat(energy) - parseFloat(userData["energy"])).toFixed(2));
    let independencePercent = parseFloat(this.calculateIndependence(independence, userData["independence"]));
    let focusPercent = 0.5 * (parseFloat(this.calculateFocus(focus, userData["focus"])));





    let totalPercent = (confidencePercent + energyPercent + independencePercent + focusPercent) / 4;


    return totalPercent;
  }
  calculateIndependence(dogIndependence, userIndependence) {

    //Independence 


    //Direct calculation   
    return (1 - Math.abs(parseFloat(dogIndependence) - parseFloat(userIndependence)).toFixed(2))

  }

  calculateFocus(dogFocus, userFocus) {

    //Focus 


    //Direct calculation  
    return (1 - Math.abs(parseFloat(dogFocus) - parseFloat(userFocus)).toFixed(2));

  }
  calculateConfidence(dogConfidence, userConfidence) {
    //Confidence 

    //Direct calculation   
    return (1 - Math.abs(parseFloat(dogConfidence) - parseFloat(userConfidence)).toFixed(2));



  }
  render() {
    // console.log(this.state);
    return (
      <div className="dogs-gallery">
        {this.state.readyToDisplay ? (
          <Gallery dogsData={this.state.dogsInfo} />


        ) : (

            <MDBRow className="text-center justify-content-center">
              <LoaderSpinner />
            </MDBRow>

          )
        }

      </div>

    );

  }
}
export default DogsGallery;
