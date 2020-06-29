import React from "react";
import firebase from "../../firebase";
import Gallery from "./gallery";
import { MDBRow, MDBContainer } from "mdbreact";
import Loader from 'react-loader-spinner'
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

      let totalMatchPercent = this.matchAlgorithm(dogsInfo[i].confidence, dogsInfo[i].energy, dogsInfo[i].focus, dogsInfo[i].independence, userData);

      // console.log(totalMatchPercent);

      dogsInfo[i].totalMatchPercent = (Math.round(totalMatchPercent * 100));
    }


    return dogsInfo.sort(this.compare);
  }
  compare = (dogA, dogB) => {
    let dogAMatchPercent = parseFloat(dogA.totalMatchPercent);
    let dogBMatchPercent = parseFloat(dogB.totalMatchPercent);

    if (dogAMatchPercent < dogBMatchPercent) {

      return -1;
    }
    if (dogAMatchPercent > dogBMatchPercent) {

      return 1;
    }
    return 0;

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
    if (userIndependence >= THRESHOLD_VALUE_INDEPENDENCE || dogIndependence >= THRESHOLD_VALUE_INDEPENDENCE) {

      return Math.max(parseFloat(userIndependence), parseFloat(dogIndependence)).toFixed(2);

    } else {

      //Direct calculation   
      return (1 - Math.abs(parseFloat(dogIndependence) - parseFloat(userIndependence)).toFixed(2))
    }
  }

  calculateFocus(dogFocus, userFocus) {

    //Focus 
    if (userFocus >= THRESHOLD_VALUE_FOCUS) {

      return parseFloat(userFocus);

    } else {

      //Direct calculation  
      return (1 - Math.abs(parseFloat(dogFocus) - parseFloat(userFocus)).toFixed(2));
    }
  }
  calculateConfidence(dogConfidence, userConfidence) {
    //Confidence 
    if (userConfidence >= THRESHOLD_VALUE_CONFIDENCE || dogConfidence >= THRESHOLD_VALUE_CONFIDENCE) {


      return (Math.max(parseFloat(userConfidence), parseFloat(dogConfidence))).toFixed(2);

    } else {

      //Direct calculation   
      return (1 - Math.abs(parseFloat(dogConfidence) - parseFloat(userConfidence)).toFixed(2));
    }


  }
  render() {
    // console.log(this.state);
    return (
      <div className="dogs-gallery">
        {this.state.readyToDisplay ? (
          <Gallery dogsData={this.state.dogsInfo} />


        ) : (

            <MDBRow className="text-center justify-content-center">
              <div className="loader-wrapper border-danger d-flex justify-content-center">



                <div className="text-center ">
                  <h1 className="loader-text" >Uploading Please Wait...     <Loader
                    type="ThreeDots"
                    color="#ff00b3 "
                    height={150}
                    width={250}
                  /></h1>

                </div>



              </div>
            </MDBRow>

          )
        }

      </div>

    );

  }
}
export default DogsGallery;
