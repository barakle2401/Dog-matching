import React from "react";
import firebase from "../../firebase";
import Main from "./gallery";
class DogsGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = { uid: props.location.state.uid };
    this.getUserData();
    this.getDogsData();
  }
  componentDidMount() {}
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
    return <Main />;
  }
}
export default DogsGallery;
