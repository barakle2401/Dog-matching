import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon
} from "mdbreact";

function Option(props) {
  return (
    <div>
      <div className="col">
        <MDBIcon icon="dog" />

        <i> {props.name}</i>
      </div>
      <div className="col">
        <select
          type="text"
          onChange={props.handleChange}
          className="form-control"
          name={props.name}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    </div>
  );
}
export default Option;
