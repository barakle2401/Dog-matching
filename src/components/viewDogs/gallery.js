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
      <div className="justify-content-center gallery-container">
        <MDBRow >  <MDBCol></MDBCol> <MDBCol className="col-xl-6 col-sm-12" sm="12" > <h1 class="heading">

          -  ההתאמות עבורך -
        </h1> </MDBCol>

          <MDBCol></MDBCol>
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
