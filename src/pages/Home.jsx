import { useDispatch, useSelector } from 'react-redux'
import { PageContainer } from '../components/PageContainer'

export const Home = () => {
    const dispatch = useDispatch()
    const { products, is_loading, error } = useSelector((state) => state.product_slice)

    return (
        <PageContainer
            appTitle={'Home'}
            background={'radial-gradient(circle, rgb(205 77 105) 50%, rgb(154 42 60) 100%)'}>
            <h2>Home Page</h2>
            <div>
                {is_loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : products.length > 0 ? (
                    <ul>
                        {products.map((product) => (
                            <li key={product._id}>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p>Category: {product.category.name}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </PageContainer>
    )
}