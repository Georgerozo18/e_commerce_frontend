import { useSelector } from 'react-redux'
import { useSpring, animated } from '@react-spring/web'
import '../../styles/components/FormCard.css'

export const FormCard = ({ front_children, back_children }) => {
    const { is_flipped } = useSelector(state => state.login_slice)

    const { transform, opacity } = useSpring({
        transform: `rotateY(${is_flipped ? 180 : 0}deg)`,
        config: {
            mass: 1,          // Aumenta la inercia, afectando la velocidad y el rebote
            tension: 32,      // Mayor tensión aumenta la velocidad
            friction: 6,      // Menor fricción produce más rebote
            clamp: false,      // Evita que la animación se "atrabe" en los bordes
            precision: 0.01,   // Define qué tan suave será la animación
        },
    })


    return (
        <div className="form_card_container">
            <animated.div
                className="form_card"
                style={{ transform }}>
                {/* Parte Frontal - Sign in */}
                <animated.div className="form_front">
                    {front_children}
                </animated.div>
                {/* Parte Trasera - Sign-up */}
                <animated.div className="form_back">
                    {back_children}
                </animated.div>
            </animated.div>
        </div>
    )
}
