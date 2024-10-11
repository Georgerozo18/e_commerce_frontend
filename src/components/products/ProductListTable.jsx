import { useDispatch, useSelector } from 'react-redux'
import '../../styles/components/products/ProductListTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { delete_product_thunk } from '../../redux/thunks/product_thunk'

export const ProductListTable = () => {
    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.product_slice)

    const handleDelete = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(delete_product_thunk(productId))
        }
    }
    return (
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
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.category.name}</td>
                            <td>{product.description}</td>
                            <td className='icon_container'>
                                <button className="icon_button view_button">
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button className="icon_button edit_button">
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
    )
}
