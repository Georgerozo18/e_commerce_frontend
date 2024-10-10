import { useSelector } from 'react-redux'
import '../../styles/components/products/ProductListTable.css'

export const ProductListTable = () => {
    const { products } = useSelector((state) => state.product_slice)
    return (
        <div className="table_container">
            <table className="product_table">
                <thead className="product_table_header">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody className="product_table_body">
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.category.name}</td>
                            <td>{product.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
