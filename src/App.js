import React, {useState, useEffect, Suspense} from 'react'
import {useLocation} from 'react-router-dom'

import Form from './components/Form'

import {BrowserRouter, Route, Routes} from 'react-router-dom'

import './App.scss'
import './progressbar.scss'
import './questions.scss'
import './options.scss'
import './form.scss'

import {quizSteps} from './data/quizSteps'

import Logo from './images/Logo.svg'

import CookieConsent from './components/CookieConsent'

import {store} from './redux/store'


function App() {
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState([])

    const handleOptionClick = (option) => {
        const updatedAnswers = [...answers]
        updatedAnswers[currentStep] = option.text
        setAnswers(updatedAnswers)
    }

    const handleNextClick = () => {
        if (!answers[currentStep]) {
            return
        }
        setCurrentStep(currentStep + 1)
    }

    const [userAgent, setUserAgent] = useState('')
    useEffect(() => {
        setUserAgent(navigator.userAgent)
    }, [])
    // console.log(userAgent)

    const customURL = window.location.href
    const params = new URLSearchParams(customURL.split('?')[1])
    const fbclid = params.get('fbclid')
    const fbAds = params.get('fb')

    return (
        <BrowserRouter>
            <div className="App">
                <div className="quiz-container">
                    <div className="progress-bar">
                        <p className="progress-bar__number">Шаг {currentStep + 1}</p>

                        <div className="progress-bar__quiz-steps">
                            {quizSteps.map((_, index) => (
                                <div key={index}
                                     className={`progress-circle ${index <= currentStep ? 'progress-circle--active' : ''}`}></div>
                            ))}
                        </div>
                    </div>

                    {currentStep < quizSteps.length ? (
                        <>
                            {/* <CookieConsent /> */}
                            <div className="question-container">
                                <div className="question-container__number">{currentStep + 1}</div>
                                <h3>{quizSteps[currentStep].question}</h3>

                                {currentStep > 0 && (
                                    <div onClick={() => setCurrentStep(currentStep - 1)} className="back-button">
                                        Назад
                                    </div>
                                )}
                            </div>


                            <div className="options-container">
                                {quizSteps[currentStep].options.map((option, index) => {

                                    if (quizSteps[currentStep].type === 'text') {
                                        // console.log('123')
                                        return (
                                            <div
                                                key={index}
                                                className={`option-button ${answers[currentStep] === option.text ? 'option-button--active' : ''}`}
                                                onClick={() => handleOptionClick(option)}
                                            >
                                                <div className="option-text">{option.text}</div>
                                            </div>
                                        )
                                    }

                                    return (

                                        <div
                                            key={index}
                                            className={`option-button ${answers[currentStep] === option.text ? 'option-button--active' : ''}`}
                                            onClick={() => handleOptionClick(option)}
                                        >


                                            <img src={option.image} alt={option.text} className="option-image"/>

                                            <div className="option-text">{option.text}</div>
                                        </div>)
                                })}
                            </div>

                            <div onClick={handleNextClick}
                                 className={`next-button ${!answers[currentStep] ? 'next-button--inactive' : ''}`}>
                                Дальше
                            </div>
                        </>
                    ) : (
                        <>
                            <Form
                                answers={answers}
                                setCurrentStep={setCurrentStep}
                                setAnswers={setAnswers}
                                fbc={fbclid ? fbclid : ''}
                                browserName={userAgent}
                            />
                        </>
                    )}
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
