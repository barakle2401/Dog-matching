import React from "react";
import firebase from "../../firebase";
import Gallery from "./gallery";
import { MDBRow, MDBContainer } from "mdbreact";
class DogsGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // uid: props.location.state.uid, userName: props.location.state.userName,
      dogsData: [
        {
          name: "באלו",
          matchPercent: "70%",
          desc: "באלו כלב שובב וחמוד שזקוק להרבה אהבה וחופש",
          image:
            "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg&w=1440"
        }
      ]
    };
    // this.getUserData();
    // this.getDogsData();

  }
  componentDidMount() { }
  componentDidUpdate(prevProps, prevState) {
    // check on previous state
    if (prevState !== this.state) {
      console.log("ready to match");
      this.displayMatch();
    }
  }
  getUserData = () => {
    let ref = firebase.database().ref("users/" + this.state.uid);
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState({ userData: state });
    });
  };
  getDogsData = () => {
    let ref = firebase.database().ref("DogsInfo");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState({ dogsData: state });
    });
  };
  displayMatch = () => {
    setTimeout(() => {
      console.log(this.state);
    }, 500);
  };
  render() {
    //console.log(this.state.userName);
    return (
      <div>

        <MDBRow className="text-center justify-content-center">
          <h1 className="h1-responsive font-weight-bold my-5 text-center white-text bg-dark">
            ההתאמות עבורך
          </h1>

        </MDBRow>
        <MDBRow>
          <Gallery dogsData={this.state.dogsData} />

        </MDBRow>

      </div>
    );

  }
}
export default DogsGallery;
