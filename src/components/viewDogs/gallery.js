import React from "react";
import "./gallery.css";
import DogCard from "./dogCard";
import { MDBRow, MDBCol } from "mdbreact";


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
      <div className="justify-content-center gallery-container ">

        <MDBRow className="match-title text-center mb-3 ">

          <h1 id="title" className="mt-5">ההתאמות עבורך</h1>


        </MDBRow>

        <MDBRow >
          {Object.keys(this.state.dogsData).map(key => (
            <DogCard details={this.state.dogsData[key]} />
          ))}
        </MDBRow>
      </div>
    );
  }
}

export default Gallery;
