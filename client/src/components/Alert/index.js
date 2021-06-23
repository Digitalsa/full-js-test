import React, { useState, useEffect } from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';


function Alert({ visibleAlert, messageAlert }) {
    const [visible, setVisible] = useState(visibleAlert);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setVisible(visibleAlert)
    }, [visibleAlert])

    useEffect(() => {
        setMessage(messageAlert)
    }, [messageAlert])

    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            style={{
                position: 'absolute',
                minHeight: '100px',
            }}
        >
            <Toast
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}
                isOpen={visible}>
                <ToastHeader icon="danger">
                    Ops! Algo não deu certo
                </ToastHeader>
                <ToastBody>
                    {message}
                </ToastBody>
            </Toast>
        </div>

    );
}

export default Alert;