import React from "react"

export default function MainPage(props) {
    return(
        <div className="mainPage-container">
            <h1>Quizzical</h1>
            <p>Test your knowlage against trivia questions!</p>
            <button className="mainPage-btn" onClick={props.handleStartQuiz}>Start quiz</button>
        </div>
    )
}