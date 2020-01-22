import React from "react";
import _ from "lodash";
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
          id={props.id}
          className="form-control"
          type="text"
          name={props.name}
          onChange={props.handleChange}
        >
          {_.range(1, props.maxNum + 1).map(value => (
            <option value={value}>{value}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
export default Option;
