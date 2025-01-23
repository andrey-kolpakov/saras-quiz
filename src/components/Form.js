//Form.js
import React from 'react'
import { useState, useEffect } from 'react'

import handleAmoWebhook from '../utils/handleAmoWebHook'
import handleCapi from '../utils/handleCapi'

import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

function Form({ answers, fbc }) {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')

    

    const handleFormSubmit = (e) => {
        e.preventDefault()

        handleAmoWebhook(name, phoneNumber, answers)

        // console.log(answers)

        console.log()
        alert('Спасибо за прохождение опроса!')

        handleCapi(name, phoneNumber, fbc)

        setPhoneNumber('')
        setName('')
    }

    return (
        <form onSubmit={handleFormSubmit} className="form-container">
            <h3>Спасибо за ответы! Получите результаты расчета, оставив контакты</h3>
            <br />
            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Введите номер телефона" required />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" required />
            <button type="submit">Отправить</button>
            <div className="tp-xxs form-link">
                Отправляя эту форму, вы соглашаетесь с нашей <br /> <a href="https://saras.kz/privacy-policy">политикой конфиденциальности</a>
            </div>
        </form>
    )
}

export default Form
