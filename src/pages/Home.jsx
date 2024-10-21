import { useSelector } from 'react-redux'
import { PageContainer } from '../components/PageContainer'
import { useSprings } from '@react-spring/web'
import '../styles/pages/Home.css'
import { MasonryGrid } from '../components/products/Cards'

export const Home = () => {
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
            background={'radial-gradient(circle, rgb(205 77 105) 50%, rgb(154 42 60) 100%)'}>
            <div className='products_container'>
                {
                    is_loading ? (<p>Loading products...</p>)
                        : error ? (<p>Error: {error}</p>)
                            : products.length > 0 ? (
                                <MasonryGrid products={products} springStyles={springStyles} />
                            ) : (<p className='home_message'>No products available!</p>)
                }
            </div>
        </PageContainer>
    )
}