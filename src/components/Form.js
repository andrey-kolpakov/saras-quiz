//Form.js
import React from 'react'
import { useState } from 'react'

import handleAmoWebhook from '../utils/handleAmoWebHook'
import handleCapi from '../utils/handleCapi'

import './form.scss'

import { InputMask } from '@react-input/mask'

function Form({ answers, fbc, browserName }) {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')

    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleFormSubmit = (e) => {
        e.preventDefault()

        handleAmoWebhook(name, phoneNumber, answers)

        handleCapi(name, phoneNumber, fbc, browserName)
        setPhoneNumber('')
        setName('')

        setIsSubmitted(true)
    }

    return (
        <form onSubmit={handleFormSubmit} className={`form-container ${isSubmitted ? 'form-container--submitted' : ''}`}>
            <div className="submited-overlay">
                <div className="submited-overlay__text">Мы получили вашу заявку и скоро свяжемся!</div>

                <div className="button-back-to-form" onClick={(evt) => setIsSubmitted(false)}>
                    Я хочу отправить форму заново
                </div>
            </div>
            <h3>Спасибо за ответы! Получите результаты расчета, оставив контакты</h3>
            <br />
            <InputMask mask="+7 (___) ___-__-__" replacement={{ _: /\d/ }} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+7 (777) 777-55-11" value={phoneNumber}/>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" required />
            <button type="submit">Отправить</button>


            <div className="tp-xxs form-link">
                Отправляя эту форму, вы соглашаетесь с нашей <br /> <a href="https://saras.kz/privacy-policy">политикой конфиденциальности</a>
            </div>

            <br />

            <div className="tp-xxs form-link">
                Мы используем файлы cookie для улучшения работы сайта, анализа статистики и рекламных целей. Отправляя эту форму, вы соглашаетесь на использование cookie.
            </div>

        </form>
    )
}

export default Form
