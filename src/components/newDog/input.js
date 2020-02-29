import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon
} from "mdbreact";

function Input(props) {
  return (
    <div>
      <div className="col">
        <i>שם</i>
        <input
          autocomplete="off"
          value={props.val}
          id={props.id}
          name={props.name}
          onChange={props.handleChange}
          type="text"
          className="form-control"
        />
      </div>
    </div>
  );
}
export default Input;
