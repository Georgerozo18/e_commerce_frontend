import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FormButton, FormContainer, FormInput } from "../form"
import { fetch_sales_thunk, update_sale_thunk } from "../../redux/thunks/sale_thunk"
import { reset_update_sale_success, set_current_sale_view } from "../../redux/slices"
import '../../styles/components/sales/EditSale.css'
import toastr from "toastr"

export const Edit = () => {
    const dispatch = useDispatch()
    const { current_sale, update_success } = useSelector((state) => state.sale_slice)

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
            dispatch(update_sale_thunk({ ...saleData, _id: current_sale._id })).then(() => {
                dispatch(fetch_sales_thunk())
            })
        } else {
            toastr.warning('All fields are required.')
        }
    }

    useEffect(() => {
        if (update_success) {
            toastr.success('Sale updated successfully!')
            dispatch(reset_update_sale_success())
            dispatch(set_current_sale_view('list')) // Cambia la vista a la lista de ventas
        }
    }, [update_success, dispatch])

    useEffect(() => {
        if (current_sale) {
            setSaleData({
                product: current_sale.product,
                quantity: current_sale.quantity,
                total_price: current_sale.total_price
            })
        }
    }, [current_sale])

    return (
        <div className="edit-sale-container">
            <FormContainer handleSubmit={handleSubmit} className="edit_form_container">
                <h3>Edit Sale Information</h3>
                <FormInput
                    label='Product'
                    type='text'
                    name='product'
                    value={saleData.product}
                    onChange={handleInputChange} />
                <FormInput
                    label='Quantity'
                    type='number'
                    name='quantity'
                    value={saleData.quantity}
                    onChange={handleInputChange} />
                <FormInput
                    label='Total Price'
                    type='number'
                    name='total_price'
                    value={saleData.total_price}
                    onChange={handleInputChange} />
                <FormButton textValue='Update Sale' />
            </FormContainer>
        </div>
    )
}
