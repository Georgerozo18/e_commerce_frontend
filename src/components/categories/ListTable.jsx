import { useDispatch, useSelector } from 'react-redux'
import '../../styles/components/categories/CategoryListTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { delete_category_thunk } from '../../redux/thunks/category_thunk'
import { set_current_category } from '../../redux/slices/category'

export const ListTable = ({ onAction }) => {
    const dispatch = useDispatch()
    const { categories } = useSelector((state) => state.category_slice)

    const handleDelete = (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            dispatch(delete_category_thunk(categoryId))
        }
    }

    const handleEdit = (category) => {
        dispatch(set_current_category(category))
        onAction('edit')
    }

    return (
        <div className='category_list_container'>
            <button
                className="icon_button create_button"
                onClick={() => onAction('create')} >
                <FontAwesomeIcon icon={faCirclePlus} /> Create Category
            </button>
            <div className="table_container">
                <table className="category_table">
                    <thead className="category_table_header">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="category_table_body">
                        {categories.map((category, index) => (
                            <tr key={index}>
                                <td>{category._id}</td>
                                <td>{category.name}</td>
                                <td className="category_table_description">{category.description}</td>
                                <td className='icon_container'>
                                    <button
                                        className="icon_button edit_button"
                                        onClick={() => handleEdit(category)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        className="icon_button delete_button"
                                        onClick={() => handleDelete(category._id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
