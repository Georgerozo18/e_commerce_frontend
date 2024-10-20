import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FormButton, FormContainer, FormInput, FormTextArea } from "../form"
import { fetch_categories_thunk, update_category_thunk } from "../../redux/thunks/category_thunk"
import { reset_update_category_success, set_current_category_view } from "../../redux/slices/category"
import '../../styles/components/categories/EditCategory.css'
import toastr from "toastr"

export const Edit = () => {
    const dispatch = useDispatch()
    const { current_category, update_success } = useSelector((state) => state.category_slice)

    const [categoryData, setCategoryData] = useState({
        name: '',
        description: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCategoryData({ ...categoryData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validar datos antes de enviarlos
        if (categoryData.name && categoryData.description) {
            dispatch(update_category_thunk({ ...categoryData, _id: current_category._id })).then(() => {
                dispatch(fetch_categories_thunk())
            })
        } else {
            toastr.warning('All fields are required.')
        }
    }

    // Limpiar el formulario y redirigir cuando la categoría se haya actualizado
    useEffect(() => {
        if (update_success) {
            toastr.success('Category updated successfully!')
            dispatch(reset_update_category_success())
            dispatch(set_current_category_view('list')) // Cambia la vista a la lista de categorías
        }
    }, [update_success, dispatch])

    // Establecer los valores de la categoría actual en el estado local
    useEffect(() => {
        if (current_category) {
            setCategoryData({
                name: current_category.name,
                description: current_category.description
            })
        }
    }, [current_category])

    return (
        <div className="edit-category-container">
            <FormContainer handleSubmit={handleSubmit} className="edit_form_container">
                <h3>Edit Category Information</h3>
                <FormInput
                    label='Name'
                    type='text'
                    name='name'
                    value={categoryData.name}
                    onChange={handleInputChange} />
                <FormTextArea
                    label='Description'
                    name='description'
                    value={categoryData.description}
                    onChange={handleInputChange} />
                <FormButton textValue='Update Category' />
            </FormContainer>
        </div>
    )
}
