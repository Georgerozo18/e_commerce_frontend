import { useState } from 'react'
import { useSelector } from 'react-redux'
import { PageContainer } from '../components/PageContainer'
import { animated, useSprings } from '@react-spring/web'
import '../styles/pages/Home.css'

export const Home = () => {
    // Estado para el hover
    const [hoveredIndex, setHoveredIndex] = useState(null)

    const { products, is_loading, error } = useSelector((state) => state.product_slice)

    // Animación de los productos
    const springStyles = useSprings(
        products.length || 0,
        products.length > 0
            ? products.map((_, index) => ({
                from: { opacity: 0, transform: 'scale(0.5)' },
                to: { opacity: 1, transform: 'scale(1)' },
                delay: index * 200,
                config: {
                    tension: 20,
                    friction: 10,
                },
            }))
            : []
    )

    return (
        <PageContainer
            appTitle={'Home'}
            background={'radial-gradient(circle, rgb(205 77 105) 50%, rgb(154 42 60) 100%)'}>
            <h2>Home Page</h2>
            <div className='products_container'>
                {
                    is_loading ? (<p>Loading products...</p>)
                        : error ? (<p>Error: {error}</p>)
                            : products.length > 0 ? (
                                <div className='masonry-grid'>
                                    {products.map((product, index) => {
                                        const isHovered = hoveredIndex === index

                                        return (
                                            <animated.div
                                                key={product._id}
                                                style={{
                                                    ...springStyles[index],
                                                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                                    zIndex: isHovered ? 1 : 0,
                                                    transition: 'transform 0.4s ease'
                                                }}
                                                className="masonry-item"
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                            >
                                                <h3>{product.name}</h3>
                                                <p>{product.description}</p>
                                                <p>Category: {product.category.name}</p>
                                            </animated.div>
                                        )
                                    })}
                                </div>
                            ) : (<p>No products available</p>)
                }
            </div>
        </PageContainer>
    )
}