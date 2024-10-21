import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export const SecretSequence = ({ sequence }) => {
    const [inputSequence, setInputSequence] = useState([])
    const hasMatched = useRef(false)
    const navigate = useNavigate()
    const location = useLocation()

    const handleKeyDown = (event) => {
        // Agregar la tecla presionada a la secuencia y limitarla al tamaño de la secuencia secreta
        if (event.key !== 'Enter') {
            setInputSequence((prev) => [...prev, event.key].slice(-sequence.length))
        } else if (event.key === 'Enter') {
            // Si se presiona "Enter", verificar si la secuencia es correcta
            if (inputSequence.join('') === sequence.join('')) {
                // Secuencia correcta
                hasMatched.current = true
                if (location.pathname !== '/admin_login') {
                    navigate('/admin_login')
                }
            }
            // Reiniciar la secuencia siempre, tanto si es correcta o incorrecta
            resetSequence()
        }
    }

    const resetSequence = () => {
        hasMatched.current = false
        setInputSequence([])
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [inputSequence]) // Escuchar cambios en la secuencia

    useEffect(() => {
        // Siempre que la ruta no sea /admin_login, reiniciar la secuencia
        if (location.pathname !== '/admin_login') {
            resetSequence()
        }
    }, [location.pathname])

    return null
}
