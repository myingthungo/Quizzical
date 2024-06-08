import React from "react"
import {decode} from "html-entities"

export default function SingleQuestion(props){
    const [selectedAnswer, setSelectedAnswer] = React.useState(null)
    const [answerIdx, setAnswerIdx] = React.useState(null)
    const [correctAnswer, setCorrectAnswer] = React.useState(false)
    const allAnswersNew = props.incorrect_answers
    
    function selectAnswer(answer, answerIdx) {
        setAnswerIdx(answerIdx)
        setSelectedAnswer(answer)
        if(answer === props.correct_answer && !correctAnswer){
            setCorrectAnswer(true)
            props.addScore()
        } else if (correctAnswer){
            setCorrectAnswer(false)
            props.subtractScore()
        } else {
            setCorrectAnswer(false)
        }
        
    }

    React.useState(()=>{
        allAnswersNew.splice(Math.floor(Math.random()*(props.incorrect_answers.length + 1)),0,props.correct_answer)
    },[])
    
    return (
        <div>
            <h3>{decode(props.question)}</h3>
            <ul className="answers-container">
                {allAnswersNew.map((item, itemIdx) => (
                    <li 
                        className={
                            props.showAnswer && item === props.correct_answer ? "all-answers selected-answer" :
                            props.showAnswer && itemIdx === answerIdx && item != props.correct_answer ? "all-answers wrong-answer" :
                            itemIdx === answerIdx ? "all-answers selected-answer" : "all-answers"
                        }
                        key={decode(item)}
                        onClick={()=> !props.showAnswer &&  selectAnswer(decode(item), itemIdx)}
                    >
                        {decode(item)}
                    </li>
                ))}
            </ul>
        </div>
    )
}