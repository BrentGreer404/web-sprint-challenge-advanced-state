import React from 'react'
import { connect } from 'react-redux'
import { fetchQuiz, postAnswer, selectAnswer } from '../state/action-creators'

function Quiz(props) {
  if (!props.quiz){
    props.fetchQuiz()
    }
  return (
    <div id="wrapper">
      {
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>
            <div id="quizAnswers">
            {[0, 1].map((v => {
              return (
                <div key={v} className="answer selected">
                {props.quiz.answers[v].text}
                <button onClick={() => props.selectAnswer(v)}>
                  {v === props.selectedAnswer ? "SELECTED" : "Select"}
                </button>
              </div>
              )
            }))}
            </div>

            <button onClick={() => props.postAnswer(props.quiz.quiz_id, props.quiz.answers[props.selectedAnswer].answer_id)} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quiz.quiz,
    selectedAnswer: state.selectedAnswer,
    message: state.message
  }
}

export default connect(mapStateToProps, {fetchQuiz, selectAnswer, postAnswer})(Quiz)