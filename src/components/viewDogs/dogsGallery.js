import React from "react";
import firebase from "../../firebase";
import Gallery from "./gallery";
import { MDBRow, MDBContainer } from "mdbreact";
import Loader from 'react-loader-spinner'
import "./gallery.css"
class DogsGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { readyToDisplay: false }

    //this.getDogsData();

  }
  componentDidMount() {
    this.getUserData();
    this.getDogsData();
  }
  componentDidUpdate(prevProps, prevState) {
    // check on previous state
    if (prevState !== this.state) {
      console.log("ready to match");
      //this.displayMatch();\
      if (this.state.dogsInfo && this.state.userData && !this.state.readyToDisplay) {

        let dogsInfo = this.calculateMatch();
        this.setState({ dogsInfo: dogsInfo, readyToDisplay: true });
      }
    }
  }
  getUserData = () => {
    let ref = firebase.database().ref("users/" + "15As3LB0g1WrH82bljU3outBV4t1");
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
  displayMatch = () => {
    setTimeout(() => {
      console.log(this.state);
    }, 500);
  };
  calculateMatch = () => {
    let { dogsInfo, userData } = this.state;

    for (let i = 0; i < Object.keys(dogsInfo).length; i++) {

      let totalMatchPercent = this.matchAlgorith(dogsInfo[i].confidence, dogsInfo[i].energy, dogsInfo[i].focus, dogsInfo[i].independence, userData);
      dogsInfo[i].totalMatchPercent = totalMatchPercent.toFixed(0);
    }

    return dogsInfo;
  }
  matchAlgorith(confidence, energy, focus, independence, userData) {

    let confidencePercent = (100 - Math.abs(parseFloat(confidence) - parseFloat(userData["confidence"])));
    let energyPercent = 1.5 * (100 - Math.abs(parseFloat(energy) - parseFloat(userData["energy"])));
    let independencePercent = (100 - Math.abs(parseFloat(independence) - parseFloat(userData["independence"])));
    let focusPercent = 0.5 * (100 - Math.abs(parseFloat(focus) - parseFloat(userData["focus"])));

    let totalPercent = (confidencePercent + energyPercent + independencePercent + focusPercent) / 4;


    return totalPercent;
  }
  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.readyToDisplay ? (
          <Gallery dogsData={this.state.dogsInfo} className="dogs-gallery" />


        ) : (<MDBRow className="text-center justify-content-center">
          <Loader
            type="BallTriangle"
            color="#000000"
            height={150}
            width={150}
          />
        </MDBRow>)
        }

      </div>

    );

  }
}
export default DogsGallery;
