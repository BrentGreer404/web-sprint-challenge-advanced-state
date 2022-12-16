// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { INPUT_CHANGE, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, RESET_FORM, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from './action-types'

const initialWheelState = {index: 0}
function wheel(state = initialWheelState, action) {
    
    switch(action.type){
      case MOVE_CLOCKWISE:
        if (state.index === 5){
          return {...state, index: 0}
        }
        else{
          return {...state, index: state.index + 1}
        }
      case MOVE_COUNTERCLOCKWISE:
        if (state.index === 0){
          return {...state, index: 5}
        }
        else{
          return {...state, index: state.index - 1}
        }
      default: 
        return state
    }
}

const initialQuizState = {
  quiz: null
}
function quiz(state = initialQuizState, action) {
  switch(action.type){
    case SET_QUIZ_INTO_STATE:
      return { ...state, quiz: action.payload}
  }
  
  return state
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type){
    case SET_SELECTED_ANSWER:
      return action.payload
    default:
      return state
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type) {
    case SET_INFO_MESSAGE:
      return action.payload
    default:
      return state
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type) {
    case INPUT_CHANGE:
      switch(action.payload.target.id) {
        case "newQuestion":
          return {
            ...state, newQuestion: action.payload.target.value
          }
        case "newTrueAnswer":
          return {
            ...state, newTrueAnswer: action.payload.target.value
          }
        case "newFalseAnswer":
          return {
            ...state, newFalseAnswer: action.payload.target.value
        }
      }
    case RESET_FORM:
      return initialFormState      
    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
