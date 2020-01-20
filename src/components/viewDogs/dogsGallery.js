import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon
} from "mdbreact";
import DogCard from "./dogCard";
import "./dogsGallery.css";
class DogGallery extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <MDBContainer className="container dogs-gallery-container ">
        <MDBRow className="d-flex justify-content-center">
          <MDBCol>
            {" "}
            <DogCard
              name="באו"
              description="שון החתיך רוצה כבר בית משלו! כלבון אנרגטי, חכם, אוהב ליטופים, קופץ לגובה ומחונך לצרכים :) אוהב לשחק במים, לאכול ירקות (שמותר לכלבים), להתכרבל ולהתפנק. שון זקוק לאנשים שיכולים להשקיע מאמץ בעבודה איתו וכאלה שבעיקר יוכל לסמוך עליהם, אוהב מאוד לעשות תרגילים וקשוב, יכול להתאים לזוג צעיר או משפחה עם ילדים בוגרים. מסתדר עם חלק מהכלבים אך לא תוקפן לאלו שלא. כרגע לא מסתדר עם חתולים. רידג׳בק מעורב | בן 3 | גדול | מחכה בכלביית נתניה להתעניינות באימוץ ופרטים נוספים --> צרו קשר בטלפון **055-6675229** (אם אין מענה שלחו וואטסאפ ונחזור בהקדם) פרטים נוספים בדף של שון באתר שלנו: http://herzelialovesanimals.org/pet/shon/"
            />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
          <MDBCol>
            {" "}
            <DogCard />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default DogGallery;
