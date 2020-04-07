import React from "react";
import "./style.css";
import QuizData from "./quiz_data";
import Login from "../login/login";
import { Link } from "react-router-dom";
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
    if (!this.state.quizIsDone) {
      this.setState(() => {
        const { currentQuestion } = this.state;
        return {
          question: QuizData[currentQuestion].question,
          currentCategory: QuizData[currentQuestion].category,
          options: QuizData[currentQuestion].options,
          totalQuestion: QuizData.length
        };
      });
    }
  };
  componentDidMount() {
    this.loadQuiz();
  }
  //display the next button, progress, load quiz
  nextQuestion = async () => {
    let { currentQuestion, totalQuestion } = this.state;
    console.log(currentQuestion, ":", totalQuestion - 1);
    if (currentQuestion == totalQuestion - 1) {
      await this.calculateUserAnswers();
      // window.location.pathname = "Login";
    } else {
      await this.setState({
        currentQuestion: this.state.currentQuestion + 1,
        showPrevBtn: true,
        showNextBtn: true,

        progress: this.state.progress + 4.3
      });
    }

    this.loadQuiz();
  };
  calculateUserAnswers = () => {
    const { answers, categories } = this.state;
    let finalCategoriesAnswers = {
      energy: 0,
      independence: 0,
      confidence: 0,
      focus: 0
    };

    for (const i in answers) {
      //console.log(`${answers[i]} : ${categories[i]}`);
      if (answers[i] === "first") {
        finalCategoriesAnswers[categories[i]] += 1;
      }
    }

    finalCategoriesAnswers["energy"] = finalCategoriesAnswers["energy"] / 11;
    finalCategoriesAnswers["confidence"] =
      finalCategoriesAnswers["confidence"] / 5;
    finalCategoriesAnswers["independence"] =
      finalCategoriesAnswers["independence"] / 5;
    finalCategoriesAnswers["focus"] = finalCategoriesAnswers["focus"] / 2;
    // console.log(finalCategoriesAnswers);
    // this.setState({
    //   currentQuestion: this.state.currentQuestion + 1,
    //   showPrevBtn: true,
    //   showNextBtn: false,
    //   progress: 100,
    //   quizIsDone: true
    // });
    this.setState({
      finalCategoriesAnswers: finalCategoriesAnswers,
      showPrevBtn: true,
      showNextBtn: false,
      progress: 100,
      quizIsDone: true
    });
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
      progress: this.state.progress - 4.3
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
    const { question, options } = this.state;

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
            <Login finalCategoriesAnswers={this.state.finalCategoriesAnswers} />
          )}
      </div>
    );
  }
}

export default Quiz;
