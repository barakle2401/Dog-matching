import React from "react";
import firebase from "../../firebase";
class DogsGallery extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.getUserData();
  }
  componentDidUpdate(prevProps, prevState) {
    // check on previous state
    // only write when it's different with the new state
    if (prevState !== this.state) {
      console.log(this.state);
    }
  }
  getUserData = () => {
    console.log(this.props.uid);
    let ref = firebase.database().ref("users/" + this.props.uid);
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };
  render() {
    console.log(this.state);
    return <h1>{this.props.userName}</h1>;
  }
}
export default DogsGallery;
