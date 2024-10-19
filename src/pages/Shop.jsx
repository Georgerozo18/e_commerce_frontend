// Componente Shop
import { PageContainer } from '../components/PageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { checkout_thunk } from '../redux/thunks/checkout_thunk'
import { reset_cart } from '../redux/slices/checkout/checkout_slice'
import { useNavigate } from 'react-router-dom'

import '../styles/pages/Shop.css'
import { Button } from '../components/global/Button'

export const Shop = () => {
    const dispatch = useDispatch()
    const { cart, is_loading } = useSelector((state) => state.checkout_slice)
    const navigate = useNavigate()

    const handleCheckout = () => {
        dispatch(checkout_thunk({ cart, navigate }))
    }

    const handleClearCart = () => {
        dispatch(reset_cart())
    }

    // Calcula el total del carrito
    const totalAmount = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0)

    return (
        <PageContainer
            appTitle={'Page Three'}
            background={'radial-gradient(circle, #4E83A8 50%, #3A6C8A 100%)'}>
            <div className='shop_container'>
                <h2 className='shop_page_title'>Checkout</h2>
                <p className='shop_page_subtitle'>Shopping Bill</p>
                {cart.length === 0 ? (
                    <p className='checkout_message'>Your cart is empty</p>
                ) : (
                    <>
                        <div className='checkout_list_container'>
                            {cart.map((item) => (
                                <div className='checkout_list' key={item.product._id}>
                                    <p className='product_'><b>Product(s):</b> {item.product.name} </p>
                                    <p className='quantity_'><b>Quantity:</b> {item.quantity}</p>
                                    <p className='price_'><b>Price:</b> ${(item.product.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className='checkout_total_container'>
                            <h3>Total:</h3>
                            <p> ${totalAmount.toFixed(2)}</p>
                        </div>
                        <div className='checkout_button_container'>
                            <Button extra_class='info_success' textValue={is_loading ? 'Processing...' : 'Checkout'} onClick={handleCheckout} />
                            <Button extra_class='info_alert' textValue={'Clear Cart'} onClick={handleClearCart} />
                        </div>
                    </>
                )}
            </div>
        </PageContainer>
    )
}
