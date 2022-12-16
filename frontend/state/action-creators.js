import { INPUT_CHANGE, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, RESET_FORM, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from "./action-types"
import axios from "axios"

const URL = "http://localhost:9000/api/quiz/"

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() { return {type: MOVE_CLOCKWISE} }

export function moveCounterClockwise() { return {type: MOVE_COUNTERCLOCKWISE} }

export function selectAnswer(answer) { return {type: SET_SELECTED_ANSWER, payload: answer} }

export function setMessage(message) { return {type: SET_INFO_MESSAGE, payload: message} }

export function setQuiz(quiz) { return {type: SET_QUIZ_INTO_STATE, payload: quiz}}

export function inputChange(event) { return {type: INPUT_CHANGE, payload: event} }

export function resetForm() { return {type:RESET_FORM} }

// ❗ Async action creators
export function fetchQuiz() {
    return function (dispatch) {
    dispatch(setQuiz(null))
    axios.get(URL+"next")
    .then((res) => dispatch(setQuiz(res.data)))
    .catch((err) => console.log(err))
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(quizId, answerId) {
  return function (dispatch) {
    const answer = { "quiz_id": quizId, "answer_id": answerId }
    axios.post(URL+"answer", answer)
    .then((res) => {
      const message = res.data.message
      dispatch(selectAnswer(""))
      dispatch(setMessage(message))
      dispatch(setQuiz(null))
    })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(form) {
  return function (dispatch) {
    const newQuiz = {
      "question_text": form.newQuestion,
      "true_answer_text": form.newTrueAnswer,
      "false_answer_text": form.newFalseAnswer }
    axios.post(URL+"new", newQuiz)
    .then(res => {
      const message = `Congrats: "${form.newQuestion}" is a great question!`
      dispatch(setMessage(message))
      dispatch(resetForm())
    })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
