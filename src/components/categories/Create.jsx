import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { create_category_thunk, fetch_categories_thunk } from "../../redux/thunks/category_thunk"
import { FormButton, FormContainer, FormInput, FormTextArea } from "../form"
import '../../styles/components/categories/CreateCategory.css'
import { reset_create_category_success } from "../../redux/slices/category"
import toastr from 'toastr'


export const Create = () => {
    const dispatch = useDispatch()
    const { create_success, created_category } = useSelector((state) => state.category_slice)

    const [categoryData, setCategoryData] = useState({
        name: '',
        description: ''
    })

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCategoryData({ ...categoryData, [name]: value })
    }

    // Enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault()

        if (categoryData.name && categoryData.description) {
            const categoryDetails = {
                name: categoryData.name,
                description: categoryData.description
            }
            dispatch(create_category_thunk(categoryDetails))
        } else {
            toastr.warning('All fields are required.')
        }
    }

    useEffect(() => {
        if (create_success && created_category) {
            toastr.success('Category created successfully!')

            dispatch(reset_create_category_success())

            setCategoryData({
                name: '',
                description: ''
            })

            dispatch(fetch_categories_thunk())
        }
    }, [create_success, created_category, dispatch])

    return (
        <div className="create-category-container">
            <FormContainer handleSubmit={handleSubmit} className="create_form_container">
                <h3 className="form_title">Category Information</h3>
                <FormInput
                    className='name'
                    label='Name'
                    type='text'
                    name='name'
                    value={categoryData.name}
                    onChange={handleInputChange} />
                <FormTextArea
                    className='description'
                    label='Description'
                    name='description'
                    value={categoryData.description}
                    onChange={handleInputChange} />
                <FormButton className='submit_button' textValue='Create Category' />
            </FormContainer>
        </div>
    )
}
