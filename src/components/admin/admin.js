import React, { useState, useEffect } from 'react';
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import "./admin.css"
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBListGroupItem,
    MDBListGroup,
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardText,
    MDBCardTitle,
    MDBIcon
} from "mdbreact";
import { DOGS_GALLERY } from '../../constants/routes';
function Admin() {

    const [dogs, setDogs] = useState({});
    useEffect(() => {

        const dogsData = async () => {
            let ref = firebase.database().ref("DogsInfo");
            let result;
            await ref.on("value", snapshot => {
                result = snapshot.val()
                setDogs(result);
            });


        }
        dogsData();
    }, [])

    // getDogsData = () => {
    //     let ref = firebase.database().ref("DogsInfo");
    //     ref.on("value", snapshot => {
    //         const state = Object.values(snapshot.val());
    //         this.setState({ dogsInfo: state });
    //     });
    // };

    return (
        <MDBContainer className=" p-5 admin-container bg-dark" fluid>

            <MDBRow className="justify-content-center" >



                {Object.entries(dogs).map(([key, value]) => {
                    { console.log(key) }
                    return (<MDBCol key={key} className="m-1 mt-4 mb-4 card-container ">
                        <MDBCard className="dog-card rounded mb-0" >
                            <MDBCardImage
                                style={{ height: "18rem", width: "100%" }}
                                className="img-fluid dog-image"
                                src={dogs[key].imgUrl}
                                waves
                            />
                            <MDBCardBody className="card-body-dog ">
                                <MDBCardTitle className="text-right name-text"><span className="white-text font-weight-bold">
                                    {dogs[key].name}  {dogs[key].sex == "זכר" ? <span> בן </span> : <span> בת </span>}

                                    {dogs[key].age}</span> </MDBCardTitle>


                                <Link to={{ pathname: `/edit-dog`, state: { dogDetails: dogs[key], dogId: key } }}>
                                    <button className="button button-primary" >
                                        <MDBIcon far icon="edit" />      ערוך    <i className="fa fa-chevron-left"></i>
                                    </button>
                                </Link>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>


                    )


                })}



            </MDBRow>

        </MDBContainer >

    );
}

export default Admin;