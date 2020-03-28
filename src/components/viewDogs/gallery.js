import React from "react";
import "./gallery.css";
import DogCard from "./dogCard";
import { MDBRow } from "mdbreact";


class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dogsData: props.dogsData
    };
  }
  componentWillMount() {

  }

  render() {
    return (
      <div>
        <MDBRow className="mt-5">
          {Object.keys(this.state.dogsData).map(key => (
            <DogCard details={this.state.dogsData[key]} />
          ))}
        </MDBRow>
      </div>
    );
  }
}

export default Gallery;
