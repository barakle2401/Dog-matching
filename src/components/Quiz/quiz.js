import React from "react";

import "./style.css";
import QuizData from "./quiz_data";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBProgress,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBContainer
} from "mdbreact";
class Quiz extends React.Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      options: [],
      showPrevBtn: false,
      showNextBtn: true,
      totalQuestion: 0,
      progress: 0
    };
  }
  loadQuiz = () => {
    const { currentQuestion } = this.state;
    this.setState(() => {
      return {
        question: QuizData[currentQuestion].question,
        options: QuizData[currentQuestion].options,
        totalQuestion: QuizData.length
      };
    });
  };
  componentDidMount() {
    this.loadQuiz();
  }
  nextQuestion = async () => {
    let { currentQuestion, totalQuestion } = this.state;
    if (currentQuestion == totalQuestion - 2) {
      await this.setState({
        currentQuestion: this.state.currentQuestion + 1,
        showPrevBtn: true,
        showNextBtn: false,

        progress: 100
      });
    } else {
      await this.setState({
        currentQuestion: this.state.currentQuestion + 1,
        showPrevBtn: true,
        showNextBtn: true,

        progress: this.state.progress + 25
      });
    }

    this.loadQuiz();
  };
  previousQuestion = async () => {
    let prevQuestion;
    let showPrevBtn;

    if (this.state.currentQuestion - 1 <= 0) {
      prevQuestion = 0;
      showPrevBtn = false;
    } else {
      prevQuestion = this.state.currentQuestion - 1;

      showPrevBtn = true;
    }
    await this.setState({
      currentQuestion: prevQuestion,
      showPrevBtn: showPrevBtn,
      showNextBtn: true,
      progress: this.state.progress - 25
    });
    await this.loadQuiz();
  };
  handleOption = e => {
    console.log(e.target);
  };
  render() {
    const { question, options, showPrevBtn, totalQuestion } = this.state;

    return (
      <div className="main">
        <MDBContainer>
          <MDBRow className="quiz-content">
            <MDBCol md="6">
              <MDBCard className="quiz-card">
                <MDBCardBody>
                  <MDBProgress value={this.state.progress} className="my-2" />
                  <p className="h4 text-center py-4 question">{question}</p>

                  {options.map(option => (
                    <MDBBtn
                      className="mt-1 btn btn-block btn-grey text-light option-btn"
                      type="button"
                      onClick={this.handleOption}
                    >
                      {option}
                      <MDBIcon far className="ml-2" />
                    </MDBBtn>
                  ))}

                  <div className="text-center py-4 mt-3">
                    <MDBBtn
                      onClick={this.previousQuestion}
                      color="pink"
                      className="text-capitalize btn-next-prev "
                      style={{
                        display: this.state.showPrevBtn ? "inline" : "none"
                      }}
                    >
                      <MDBIcon className="mr-1" icon="arrow-left" />
                      Back
                    </MDBBtn>
                    <MDBBtn
                      onClick={this.nextQuestion}
                      className="btn btn-default text-capitalize btn-next-prev"
                      type="button"
                      style={{
                        display: this.state.showNextBtn ? "inline" : "none"
                      }}
                    >
                      Next
                      <MDBIcon className="ml-1" icon="arrow-right" />
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default Quiz;
