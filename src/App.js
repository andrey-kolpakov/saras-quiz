import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import { Link } from 'react-router'
import { Link } from 'react-router-dom'

import Form from './components/Form'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.scss'
import './progressbar.scss'
import './questions.scss'
import './options.scss'
import './form.scss'

import emal from './images/materials/emal.JPG'
import beton from './images/materials/beton.JPG'
import massiv from './images/materials/massiv.JPG'
import neznayu from './images/materials/ne-znayu.JPG'
import plastic from './images/materials/plastic.JPG'
import shpon from './images/materials/shpon.JPG'

const quizSteps = [
    {
        question: 'В каком стиле вы хотите кухню?',
        options: [
            { text: 'Классика', image: 'https://fakeimg.pl/150?text=Классика' },
            { text: 'Модерн', image: 'https://fakeimg.pl/150?text=Модерн' },
            { text: 'Минимализм', image: 'https://fakeimg.pl/150?text=Минимализм' },
        ],
        image: 'https://fakeimg.pl/600x300?text=Стиль+Кухни',
    },
    {
        question: 'В каком цвете вы бы хотели кухню?',
        options: [
            { text: 'Темные цвета', image: 'https://fakeimg.pl/150?text=Темные+цвета' },
            { text: 'Светлые цвета', image: 'https://fakeimg.pl/150?text=Светлые+цвета' },
            { text: 'Цветная', image: 'https://fakeimg.pl/150?text=Цветная' },
        ],
        image: 'https://fakeimg.pl/600x300?text=Цвет+Кухни',
    },
    {
        question: 'Какой материал вам нравится?',
        options: [
            { text: 'Эмаль', image: emal },
            { text: 'Шпон', image: shpon },
            { text: 'Массив', image: massiv },
            { text: 'Пластик', image: plastic },
            { text: 'Бетон', image: beton },
            { text: 'Ещё не знаю', image: neznayu },
        ],
        image: 'https://fakeimg.pl/600x300?text=Материал+Кухни',
    },
    {
        question: 'Как срочно вам нужна новая кухня?',
        options: [
            { text: 'Через 1 месяц', image: 'https://fakeimg.pl/150?text=1+месяц' },
            { text: 'Через 2 месяца', image: 'https://fakeimg.pl/150?text=2+месяца' },
            { text: 'Через 3 месяца', image: 'https://fakeimg.pl/150?text=3+месяца' },
            { text: 'Через 6 месяцев', image: 'https://fakeimg.pl/150?text=6+месяцев' },
        ],
        image: 'https://fakeimg.pl/600x300?text=Срочность+Кухни',
    },
    {
        question: 'Какой бюджет вы планируете на кухню?',
        options: [
            { text: 'Стандарт от 50 000 до 150 000 руб.', image: 'https://fakeimg.pl/150?text=Стандарт' },
            { text: 'Престиж от 150 000 до 200 000 руб.', image: 'https://fakeimg.pl/150?text=Престиж' },
            { text: 'Премиум от 200 000 до 350 000 руб.', image: 'https://fakeimg.pl/150?text=Премиум' },
            { text: 'Максимальный свыше 350 000 руб.', image: 'https://fakeimg.pl/150?text=Максимальный' },
        ],
        image: 'https://fakeimg.pl/600x300?text=Бюджет+Кухни',
    },
]

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

    const [queryState, setQuaryState] = useState('')

    useEffect(() => {
        // setQuaryState(queryString.parse(this.props.location.search))
        // console.log(this)
    }, [])

    const customURL = window.location.href
    const params = new URLSearchParams(customURL.split('?')[1])
    const fbclid = params.get('fbclid')
    console.log(fbclid)

    // console.log(params)

    return (
        <BrowserRouter>
            <div className="App">
                <div className="quiz-container">
                    <div className="progress-bar">
                        <p className="progress-bar__number">Шаг {currentStep + 1}</p>

                        <div className="progress-bar__quiz-steps">
                            {quizSteps.map((_, index) => (
                                <div key={index} className={`progress-circle ${index <= currentStep ? 'progress-circle--active' : ''}`}></div>
                            ))}
                        </div>
                    </div>

                    {currentStep < quizSteps.length ? (
                        <>
                            <div className="question-container">
                                <div className="question-container__number">{currentStep + 1}</div>
                                <h3>{quizSteps[currentStep].question}</h3>

                                {currentStep > 0 && (
                                    <div onClick={() => setCurrentStep(currentStep - 1)} className="back-button">
                                        Назад
                                    </div>
                                )}
                            </div>
                            <img src={quizSteps[currentStep].image} alt="Вопрос" className="question-image" />
                            <div className="options-container">
                                {quizSteps[currentStep].options.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`option-button ${answers[currentStep] === option.text ? 'option-button--active' : ''}`}
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        <img src={option.image} alt={option.text} className="option-image" />

                                        <div className="option-text">{option.text}</div>
                                    </div>
                                ))}
                            </div>

                            <div onClick={handleNextClick} className={`next-button ${!answers[currentStep] ? 'next-button--inactive' : ''}`}>
                                Дальше
                            </div>
                        </>
                    ) : (
                        <Form answers={answers} setCurrentStep={setCurrentStep} setAnswers={setAnswers} fbc={fbclid}/>
                    )}
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
