import React, { useState, useEffect, useCallback } from 'react';
import firebase from "../../firebase";
import { confirmAlert } from 'react-confirm-alert';
import {
    BrowserRouter as Router,
    Link,
    useLocation
} from "react-router-dom";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBCard

} from "mdbreact";
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function EditDog(props) {
    let query = useQuery();
    const [dog, setDog] = useState(props.location.state.dogDetails);
    const [dogId, setDogId] = useState(props.location.state.dogId);
    // useEffect(() => {
    //     const dogData = async () => {

    //         setDog(props.location.state.dogDetails)
    //         setDogId(props.location.state.dogId)
    //     }
    //     dogData();
    // }, [])

    // const handleSubmit = () => {


    // }

    const handleSubmit = useCallback(() => {
        return (
            confirmAlert({
                title: 'השינויים נשמרו בהצלחה',
                message: 'תודה',
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => window.location = "/"
                    }
                ]
            })

        )


    })
    console.log(dog)
    console.log(dogId)
    return (

        <MDBContainer className="pt-5">
            <MDBCard >
                <div className="d-flex justify-content-center">
                    <h1 className="text-center">טופס עריכת כלב</h1>
                </div>
                <div className="row p-3">
                    <div className="col-xl-4 col-sm-12 text-center">
                        <span className="">Name</span>
                        <input className="form-control " value={dog.name} />

                    </div>
                    <div className="col-xl-4 col-sm-12 text-center">
                        <span className="">Age</span>
                        <input className="form-control " value={dog.age} />

                    </div>
                    <div className="col-xl-4 col-sm-12 text-center">
                        <span className="">Size</span>
                        <input className="form-control " value={dog.size} />

                    </div>
                </div>
                <div className="row p-3">
                    <div className="col-xl-3 col-sm-12 text-center">
                        <span className="">Breed</span>
                        <input className="form-control " value={dog.breed} />

                    </div>
                    <div className="col-xl-3 col-sm-12 text-center">
                        <span className="">Contact Name</span>
                        <input className="form-control " value={dog.contactName} />

                    </div>
                    <div className="col-xl-3 col-sm-12 text-center">
                        <span className="">Contact Phone</span>
                        <input className="form-control " value={dog.contactPhone} />

                    </div>
                    <div className="col-xl-3 col-sm-12 text-center">
                        <span className="">Sex</span>
                        <input className="form-control " value={dog.sex} />

                    </div>
                </div>
                <div className="row p-3">
                    <div className="col-xl-3 col-sm-12 text-center">
                        <span className="">Energy Level</span>
                        <input className="form-control " value={dog.energy} />

                    </div>
                    <div className="col-xl-3 col-sm-12 text-center">
                        <span className="">Focus Level</span>
                        <input className="form-control " value={dog.focus} />

                    </div>
                    <div className="col-xl-3 col-sm-12 text-center">
                        <span className="">Confidence Level</span>
                        <input className="form-control " value={dog.confidence} />

                    </div>
                    <div className="col-xl-3 col-sm-12 text-center">
                        <span className="">Independence Level</span>
                        <input className="form-control " value={dog.independence} />

                    </div>
                </div>
                <div className="row p-3 ">
                    <div className="col-xl-3 col-sm-12 text-center">
                        <span className="">Image Url</span>
                        <input className="form-control " value={dog.imgUrl} />
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <MDBBtn color="elegant" onClick={handleSubmit}>Submit</MDBBtn>
                </div>
            </MDBCard>


        </MDBContainer>


    )
}
export default EditDog;