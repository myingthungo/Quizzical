import React from "react"
import SingleQuestion from "./SingleQuestion"

export default function QuestionsPage(props) {
    const abortController = new AbortController()
    const [questionsArray, setQuestionsArray] = React.useState([])
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = React.useState(0)
    const [score, setScore] = React.useState(0)
    const [showAnswer, setShowAnswer] = React.useState(false)
    
    React.useEffect(()=>{
        try {
        fetch("https://opentdb.com/api.php?amount=3&type=multiple")
            .then(res => res.json())
            .then(data => setQuestionsArray(data.results))
        } catch(error) {
            console.log("error", error)
        }   
        return ()=> {
            abortController.abort()
        }
    },[])
    
    function addScore(num) {
        setNumberOfCorrectAnswers(prevNumber => prevNumber + num)
    }
    function subtractScore(num) {
        setNumberOfCorrectAnswers(prevNumber => prevNumber - num)
    }
    
    function handleCheck(){
        setScore(numberOfCorrectAnswers)
        setShowAnswer(true)
    }
    
    const quiz = questionsArray.map(item => {
        return (
            <SingleQuestion 
                key= {item.question}
                question= {item.question}
                correct_answer= {item.correct_answer}
                incorrect_answers= {item.incorrect_answers}
                addScore={()=>addScore(1)}
                subtractScore={()=>subtractScore(1)}
                showAnswer={showAnswer}
            />   
        )
    })

    return (
        <div className= "questionsPage-container">
            <div>
                {quiz}
            </div>
            {!showAnswer && questionsArray.length > 0 && <button className="check-btn" 
            onClick={handleCheck}>Check answers</button>}
            <div className="score-container">
                {showAnswer && 
                    <p className="score-text">Correct Answers: {score}/3</p>
                }
                {showAnswer && 
                <button 
                    className="play-again-btn" 
                    onClick={props.handleStartQuiz}>Play Again!</button>}
            </div>
        </div>
    )
}