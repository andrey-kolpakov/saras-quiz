import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
    const [isConsentGiven, setIsConsentGiven] = useState(false);

    useEffect(() => {
        // Проверка, дали ли уже согласие
        const consent = localStorage.getItem('cookieConsent');
        if (consent === 'true') {
            setIsConsentGiven(true);
        }
    }, []);

    const handleAccept = () => {
        // Сохранение согласия в localStorage
        localStorage.setItem('cookieConsent', 'true');
        setIsConsentGiven(true);
    };

    if (isConsentGiven) return null; // Если согласие уже дано, не показываем уведомление

    return (
        <div style={styles.container}>
            <p style={styles.text}>
                Мы используем файлы cookie для улучшения работы сайта, анализа статистики и рекламных целей. Продолжая использовать сайт, вы соглашаетесь на использование cookie.
            </p>
            <button style={styles.button} onClick={handleAccept}>
                Согласен
            </button>
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        right: '20px',
        backgroundColor: '#333',
        color: '#fff',
        padding: '15px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
    },
    text: {
        margin: 0,
        fontSize: '14px',
        flex: 1,
    },
    button: {
        marginLeft: '15px',
        padding: '10px 20px',
        backgroundColor: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default CookieConsent;
