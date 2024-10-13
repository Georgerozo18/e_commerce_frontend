import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FormButton, FormContainer, FormInput, FormSelect, FormTextArea } from "../form"
import { fetch_products_thunk, update_product_thunk } from "../../redux/thunks/product_thunk"
import { reset_current_product, reset_update_success, set_current_view } from "../../redux/slices"
import '../../styles/components/products/EditProduct.css'

export const Edit = () => {
    const dispatch = useDispatch()
    const { current_product, update_success } = useSelector((state) => state.product_slice)

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: ''
    })

    const categories = [
        {
            "_id": "66e92676e8fb148563b8c94c",
            "name": "Scale 1/18 Cars",
            "description": "collection cars approximately 28 cm wide, opening doors and movement on the steering wheel",
        },
        {
            "_id": "66e92676e8fb148563b8c94e",
            "name": "Scale 1/43 Motorbikes",
            "description": "Collectible motorcycles approximately 10 cm wide, some moving parts.",
        },
        {
            "_id": "66e92676e8fb148563b8c94d",
            "name": "Scale 1/64 Cars",
            "description": "collection cars approximately 7cm wide, like hotweels style",
        },
        {
            "_id": "66ecc6e9e4d8e7f1999b1f84",
            "name": "Scale 1/18 Motorbikes Plus Ultra 2",
            "description": "collection motorbikes approximately 28 cm wide, opening doors and movement on the steering wheel plus ultra, full full",
        }
    ]

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProductData({ ...productData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validar datos antes de enviarlos
        if (productData.name && productData.description && productData.price && productData.stock && productData.category) {
            dispatch(update_product_thunk({ ...productData, _id: current_product._id })).then(() => {
                dispatch(fetch_products_thunk())
            })
        } else {
            alert('All fields are required.')
        }
    }

    // Limpiar el formulario y redirigir cuando el producto se haya creado
    useEffect(() => {
        if (update_success) {
            alert('Product updated successfully!')
            dispatch(reset_update_success())
            dispatch(set_current_view('list'))
        }
    }, [update_success, dispatch])

    // Establecer los valores del producto actual en el estado local
    useEffect(() => {
        if (current_product) {
            setProductData({
                name: current_product.name,
                description: current_product.description,
                price: current_product.price,
                stock: current_product.stock,
                category: current_product.category ? current_product.category._id : ''
            })
        }
    }, [current_product])

    const selectedCategory = categories.find(cat => cat._id === productData.category)

    return (
        <div className="edit-product-container">
            <FormContainer handleSubmit={handleSubmit} className="edit_form_container">
                <h3>Edit Product Information</h3>
                <FormInput
                    label='Name'
                    type='text'
                    name='name'
                    value={productData.name}
                    onChange={handleInputChange} />
                <FormTextArea
                    label='Description'
                    name='description'
                    value={productData.description}
                    onChange={handleInputChange} />
                <FormInput
                    label='Price'
                    type='number'
                    name='price'
                    min={0}
                    max={100}
                    value={productData.price}
                    onChange={handleInputChange} />
                <FormInput
                    label='Stock'
                    type='number'
                    name='stock'
                    min={0}
                    max={100}
                    value={productData.stock}
                    onChange={handleInputChange} />
                <FormSelect
                    label="Category"
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    options={categories}
                />
                <FormButton textValue='Update Product' />
            </FormContainer>

            <div className="preview_product">
                <h3>Product Preview</h3>
                <p><strong>Name:</strong> {productData.name || 'N/A'} </p>
                <p><strong>Description:</strong> {productData.description || 'N/A'} </p>
                <p><strong>Price:</strong> {productData.price ? `$${productData.price}` : 'N/A'} </p>
                <p><strong>Stock:</strong> {productData.stock || 'N/A'} </p>
                <p><strong>Category:</strong> {selectedCategory ? selectedCategory.name : 'N/A'} </p>
            </div>
        </div>
    )
}
