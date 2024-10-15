import { useDispatch, useSelector } from 'react-redux'
import '../../styles/components/products/ProductListTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { delete_product_thunk } from '../../redux/thunks/product_thunk'
import { set_current_product } from '../../redux/slices/products/product_slice'

export const ListTable = ({ onAction }) => {
    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.product_slice)

    const handleDelete = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(delete_product_thunk(productId))
        }
    }

    const handleEdit = (product) => {
        dispatch(set_current_product(product))
        onAction('edit')
    }

    return (
        <div className='product_list_container'>
            <button
                className="icon_button create_button"
                onClick={() => onAction('create')} >
                <FontAwesomeIcon icon={faCirclePlus} /> Create Product
            </button>
            <div className="table_container">
                <table className="product_table">
                    <thead className="product_table_header">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="product_table_body">
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.stock}</td>
                                <td>{product.category ? product.category.name : 'Category not available'}</td>
                                <td className="product_table_description">{product.description}</td>
                                <td className='icon_container'>
                                    <button
                                        className="icon_button edit_button"
                                        onClick={() => handleEdit(product)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        className="icon_button delete_button"
                                        onClick={() => handleDelete(product._id)}>
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
