// Componente Shop
import { PageContainer } from '../components/PageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { checkout_thunk } from '../redux/thunks/checkout_thunk'
import { reset_cart } from '../redux/slices/checkout/checkout_slice'

export const Shop = () => {
    const dispatch = useDispatch()
    const { cart, is_loading } = useSelector((state) => state.checkout_slice)

    const handleCheckout = () => {
        dispatch(checkout_thunk(cart))
    }

    const handleClearCart = () => {
        dispatch(reset_cart())
    }

    return (
        <PageContainer
            appTitle={'Page Three'}
            background={'radial-gradient(circle, #4E83A8 50%, #3A6C8A 100%)'}>
            <div>
                <h2>Shopping Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div>
                        <ul>
                            {cart.map((item) => (
                                <li key={item.product._id}>
                                    {item.product.name} - Quantity: {item.quantity}
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleCheckout} disabled={is_loading}>
                            {is_loading ? 'Processing...' : 'Checkout'}
                        </button>
                        <button onClick={handleClearCart} disabled={is_loading}>
                            Clear Cart
                        </button>
                    </div>
                )}
            </div>
        </PageContainer>
    )
}
