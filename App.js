import React from "react"
import MainPage from "./components/MainPage"
import QuestionsPage from "./components/QuestionsPage"

export default function App() {
    const [mainPage, setMainPage] = React.useState(false)

    function handleStartQuiz() {
        setMainPage(prevState => !prevState)
    }
    
    return (
        <main>
            {!mainPage && <MainPage 
                handleStartQuiz= {handleStartQuiz}
            />}
            {mainPage && <QuestionsPage
                handleStartQuiz= {handleStartQuiz}
            />}
        </main>
    )
}