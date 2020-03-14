import React from "react";
import "./style.css";
import QuizData from "./quiz_data";
import DogsGallery from "../viewDogs/dogsGallery";
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
      progress: 0,
      answers: {},
      categories: {},
      quizIsDone: false
    };
  }
  //fetch the next question
  loadQuiz = () => {
    const { currentQuestion } = this.state;
    this.setState(() => {
      return {
        question: QuizData[currentQuestion].question,
        currentCategory: QuizData[currentQuestion].category,
        options: QuizData[currentQuestion].options,
        totalQuestion: QuizData.length
      };
    });
  };
  componentDidMount() {
    this.loadQuiz();
  }
  //display the next button, progress, load quiz
  nextQuestion = async () => {
    let { currentQuestion, totalQuestion } = this.state;
    if (currentQuestion == totalQuestion - 2) {
      await this.calculateUserAnswers();
      // window.location.pathname = "Login";
    } else {
      await this.setState({
        currentQuestion: this.state.currentQuestion + 1,
        showPrevBtn: true,
        showNextBtn: true,

        progress: this.state.progress + 6
      });
    }

    this.loadQuiz();
  };
  calculateUserAnswers = () => {
    const { answers, categories } = this.state;
    console.log(categories);
    console.log(answers);
    // this.setState({
    //   currentQuestion: this.state.currentQuestion + 1,
    //   showPrevBtn: true,
    //   showNextBtn: false,
    //   progress: 100,
    //   quizIsDone: true
    // });
  };
  //display back btn, move back, fetch the previous question, load quiz
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
      progress: this.state.progress - 6
    });
    await this.loadQuiz();
  };
  handleAnswer = async answer => {
    const currentQuestion = this.state.currentQuestion;
    const answers = this.state.answers;
    const categories = this.state.categories;
    answers[currentQuestion] = answer;
    categories[currentQuestion] = this.state.currentCategory;
    await this.setState({ answers: answers, categories: categories });
    await this.nextQuestion();
  };
  render() {
    const {
      question,
      options,
      showPrevBtn,
      totalQuestion,
      currentQuestion
    } = this.state;
    // console.log(this.state.answers[this.state.currentQuestion]);
    let firstColor = "",
      secColor = "",
      displayNext = false;
    if (this.state.answers[this.state.currentQuestion] == "first") {
      firstColor = "red";
      secColor = "";
      displayNext = true;
    } else if (this.state.answers[this.state.currentQuestion] == "second") {
      firstColor = "";
      secColor = "red";
      displayNext = true;
    }
    return (
      <div>
        {!this.state.quizIsDone ? (
          <div className="main-quiz">
            <MDBContainer className=" py-5">
              <MDBRow className="quiz-content">
                <MDBCol md="6">
                  <MDBCard className="quiz-card">
                    <MDBCardBody>
                      <MDBProgress
                        value={this.state.progress}
                        className="my-2"
                      />

                      <p className="h4 text-center py-4 question">
                        {this.state.progress == 100 ? (
                          <div className="spinner-border  " role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          question
                        )}
                      </p>
                      <MDBBtn
                        className="mt-1 btn btn-block btn-grey option-btn"
                        type="button"
                        onClick={() => {
                          this.handleAnswer("first");
                        }}
                        style={{ color: firstColor }}
                      >
                        {options.first}
                        <MDBIcon far className="ml-2" />
                      </MDBBtn>
                      <MDBBtn
                        className="mt-1 btn btn-block btn-grey option-btn"
                        type="button"
                        onClick={() => {
                          this.handleAnswer("second");
                        }}
                        style={{
                          color: secColor
                        }}
                      >
                        {options.second}
                        <MDBIcon far className="ml-2" />
                      </MDBBtn>

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
                          className="btn btn-default text-capitalize btn-next-prev "
                          type="button"
                          style={{
                            display: displayNext ? "inline" : "none"
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
        ) : (
          <DogsGallery answers={this.state.answers} />
        )}
      </div>
    );
  }
}

export default Quiz;
