import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import reducer from '../state/reducer'

export function Form(props) {

  const onChange = evt => {
    evt.preventDefault()
    console.log(evt.target.id)
    console.log(evt.nativeEvent.data)
    props.inputChange(evt)
  }

  const onSubmit = evt => {

  }
  console.log(props)
  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input value={props.form.newQuestion} maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input value={props.form.newTrueAnswer} maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input value={props.form.newFalseAnswer} maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
