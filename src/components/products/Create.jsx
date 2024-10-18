import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { create_products_thunk, fetch_products_thunk, upload_image_thunk, upload_model_thunk } from "../../redux/thunks/product_thunk"
import { FormButton, FormContainer, FormInput, FormSelect, FormTextArea } from "../form"
import '../../styles/components/products/CreateProduct.css'
import { reset_create_success } from "../../redux/slices"
import { Card } from "./Card"

export const Create = () => {
    const dispatch = useDispatch()
    const { create_success, created_product } = useSelector((state) => state.product_slice)

    const [isUploading, setIsUploading] = useState(false)
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '', // Este valor debe ser un string, por ejemplo el _id de la categoría
        image: null,
        model: null
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

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProductData({ ...productData, [name]: value })
    }

    // Enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(productData)

        if (productData.name && productData.description && productData.price && productData.stock && productData.category) {
            const productsDetails = {
                name: productData.name,
                description: productData.description,
                price: productData.price,
                stock: productData.stock,
                category: productData.category, // Aquí envías el _id de la categoría
            }
            dispatch(create_products_thunk(productsDetails))
        } else {
            alert('All fields, except the image and model are required.')
        }
    }

    useEffect(() => {
        if (create_success && created_product) {
            alert('Product created successfully! Now uploading files...')
            console.log('Created Product:', created_product)

            const { _id } = created_product.product
            setIsUploading(true)

            const uploadPromises = []

            if (productData.image) {
                alert('uploading image...')
                uploadPromises.push(dispatch(upload_image_thunk({ productId: _id, image: productData.image })))
            }
            if (productData.model) {
                alert('uploading model...')
                uploadPromises.push(dispatch(upload_model_thunk({ productId: _id, model: productData.model })))
            }

            Promise.all(uploadPromises).then(() => {
                dispatch(reset_create_success())
                setIsUploading(false)
            })

            setProductData({
                name: '',
                description: '',
                price: '',
                stock: '',
                category: '',
                image: null,
                model: null
            })

            dispatch(fetch_products_thunk())
        }
    }, [create_success, created_product, dispatch, productData.image, productData.model])

    // Buscar el nombre de la categoría en base al ID seleccionado
    const selectedCategory = categories.find(cat => cat._id === productData.category)

    // Condición para mostrar la vista previa solo si hay datos
    const isPreviewVisible = productData.name || productData.description || productData.price || productData.stock || productData.category

    return (
        <div className="create-product-container">
            <FormContainer handleSubmit={handleSubmit} className="create_form_container">
                <h3 className="form_title">Product Information</h3>
                <FormInput
                    className='name'
                    label='Name'
                    type='text'
                    name='name'
                    value={productData.name}
                    onChange={handleInputChange} />
                <FormInput
                    className='price'
                    label='Price'
                    type='number'
                    name='price'
                    min={0}
                    max={100}
                    value={productData.price}
                    onChange={handleInputChange} />
                <FormInput
                    className='stock'
                    label='Stock'
                    type='number'
                    name='stock'
                    min={0}
                    max={100}
                    value={productData.stock}
                    onChange={handleInputChange} />
                <FormSelect
                    className='category'
                    label="Category"
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    options={categories}
                />
                <FormTextArea
                    className='description'
                    label='Description'
                    name='description'
                    value={productData.description}
                    onChange={handleInputChange} />
                <FormInput
                    className='image'
                    label="Image"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setProductData({ ...productData, image: e.target.files[0] })}
                />
                <FormInput
                    className='model'
                    label="Model"
                    type="file"
                    name="model"
                    accept=".glb"
                    onChange={(e) => setProductData({ ...productData, model: e.target.files[0] })}
                />
                <FormButton className='submit_button' textValue='Create Product' />
            </FormContainer>

            {isPreviewVisible && (
                <div className="preview_product">
                    <h3>Product Preview</h3>
                    <Card
                        product={productData}
                        springStyle={{}}
                        isHovered={false}
                        onMouseEnter={() => { }}
                        onMouseLeave={() => { }}
                        onClick={() => { }}
                    />
                </div>
            )}
        </div>
    )
}
