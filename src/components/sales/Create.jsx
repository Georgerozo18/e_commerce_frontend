import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { create_sale_thunk, fetch_sales_thunk } from "../../redux/thunks/sale_thunk"
import { FormButton, FormContainer, FormInput, FormTextArea } from "../form"
import '../../styles/components/sales/CreateSale.css'
import { reset_create_sale_success } from "../../redux/slices"
import toastr from 'toastr'


export const Create = () => {
    const dispatch = useDispatch()
    const { create_success, created_sale } = useSelector((state) => state.sale_slice)

    const [saleData, setSaleData] = useState({
        product: '',
        quantity: '',
        total_price: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSaleData({ ...saleData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (saleData.product && saleData.quantity && saleData.total_price) {
            const saleDetails = {
                product: saleData.product,
                quantity: saleData.quantity,
                total_price: saleData.total_price
            }
            dispatch(create_sale_thunk(saleDetails))
        } else {
            toastr.warning('All fields are required.')
        }
    }

    useEffect(() => {
        if (create_success && created_sale) {
            toastr.success('Sale created successfully!')

            dispatch(reset_create_sale_success())

            setSaleData({
                product: '',
                quantity: '',
                total_price: ''
            })

            dispatch(fetch_sales_thunk())
        }
    }, [create_success, created_sale, dispatch])

    return (
        <div className="create-sale-container">
            <FormContainer handleSubmit={handleSubmit} className="create_form_container">
                <h3 className="form_title">Sale Information</h3>
                <FormInput
                    className='product'
                    label='Product'
                    type='text'
                    name='product'
                    value={saleData.product}
                    onChange={handleInputChange} />
                <FormInput
                    className='quantity'
                    label='Quantity'
                    type='number'
                    name='quantity'
                    value={saleData.quantity}
                    onChange={handleInputChange} />
                <FormInput
                    className='total_price'
                    label='Total Price'
                    type='number'
                    name='total_price'
                    value={saleData.total_price}
                    onChange={handleInputChange} />
                <FormButton className='submit_button' textValue='Create Sale' />
            </FormContainer>
        </div>
    )
}
