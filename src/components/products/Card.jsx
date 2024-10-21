// Card.jsx
import { animated } from '@react-spring/web'
import '../../styles/components/products/Card.css'

export const Card = ({ product, springStyle, isHovered, onMouseEnter, onMouseLeave, onClick }) => {
    return (
        <animated.div
            style={{
                ...springStyle,
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                zIndex: isHovered ? 1 : 0,
                transition: 'transform 0.4s ease',
            }}
            className="masonry-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            <p className='category_card'>{product.category.name}</p>
            <h3 className='title_card'>{product.name}</h3>
            <img className='image_card' src={product.image} alt={product.name} />
            <p className='description_card'>{product.description}</p>
            <p className='price_card'>${product.price}</p>
        </animated.div>
    )
}
