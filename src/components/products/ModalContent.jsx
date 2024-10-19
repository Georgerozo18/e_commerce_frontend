import { Suspense, useState } from 'react'
import { Model3D } from './Model3D'
import { Button } from '../global/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import '../../styles/components/products/ModalContent.css'
import { useDispatch } from 'react-redux'
import { add_to_cart } from '../../redux/slices/checkout/checkout_slice'
import toastr from 'toastr'

toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    timeOut: '3000',
    extendedTimeOut: '1000',
}

export const ModalContent = ({ selectedProduct }) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)

    const handleAddToCart = (event) => {
        event.preventDefault()
        toastr.success(`${quantity} ${selectedProduct.name} added to cart!`, 'Product Added')
        dispatch(add_to_cart({ ...selectedProduct, quantity }))
    }

    const total = selectedProduct.price * quantity

    const increaseQuantity = () => {
        if (quantity < selectedProduct.stock) {
            setQuantity(quantity + 1)
        }
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <>
            {selectedProduct && (
                <>
                    <h2 className='modal_content_title_card'>{selectedProduct.name}</h2>
                    {selectedProduct.model ? (
                        <Suspense fallback={<div>Loading 3D model...</div>}>
                            <Model3D modelUrl={selectedProduct.model} />
                        </Suspense>
                    ) : (
                        <div className='no-model-message'>
                            No 3D model available for this product.
                        </div>
                    )}
                    <div className='modal_content_values_container'>
                        <div className='modal_content_price_container'>
                            <p className='modal_content_price_card_title'>Price:</p>
                            <p className='modal_content_price_card_value'> ${selectedProduct.price.toFixed(2)}</p>
                        </div>
                        <div className='modal_content_stock_container'>
                            <p className='modal_content_stock_card_title'>Quantity:</p>
                            <div className='modal_content_stock_control'>
                                {/* Botón para disminuir */}
                                <button
                                    className='quantity-button'
                                    onClick={decreaseQuantity}
                                    disabled={quantity <= 1}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                {/* Mostrar cantidad seleccionada */}
                                <input
                                    type="number"
                                    className='modal_content_stock_card_value'
                                    value={quantity}
                                    min="1"
                                    max={selectedProduct.stock}
                                    onChange={(e) => {
                                        const value = Math.max(1, Math.min(selectedProduct.stock, parseInt(e.target.value)))
                                        setQuantity(value)
                                    }}
                                />
                                {/* Botón para aumentar */}
                                <button
                                    className='quantity-button'
                                    onClick={increaseQuantity}
                                    disabled={quantity >= selectedProduct.stock}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            <p className='modal_content_stock_available'>Available: {selectedProduct.stock}</p>
                        </div>
                    </div>
                    <div className='modal_content_total_container'>
                        <p className='modal_content_total_card_title'>Total:</p>
                        <p className='modal_content_total_card_value'>${total.toFixed(2)}</p>
                    </div>
                    {selectedProduct.stock > 0 ? (
                        <Button textValue={'Add to Cart'} onClick={handleAddToCart} />
                    ) : (
                        <p className='out_of_stock_message'>Out of Stock!</p>
                    )}
                </>
            )}
        </>
    )
}