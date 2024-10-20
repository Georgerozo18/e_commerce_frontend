import { useDispatch, useSelector } from 'react-redux'
import '../../styles/components/sales/SaleListTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faCirclePlus, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { delete_sale_thunk } from '../../redux/thunks/sale_thunk'
import { set_current_sale } from '../../redux/slices'
import React, { useState } from 'react'

export const ListTable = ({ onAction }) => {
    const dispatch = useDispatch()
    const { sales } = useSelector((state) => state.sale_slice)

    const handleDelete = (saleId) => {
        if (window.confirm('Are you sure you want to delete this sale?')) {
            dispatch(delete_sale_thunk(saleId))
        }
    }

    const handleEdit = (sale) => {
        dispatch(set_current_sale(sale))
        onAction('edit')
    }

    const [expandedRows, setExpandedRows] = useState({})

    const toggleRow = (saleId) => {
        setExpandedRows((prev) => ({
            ...prev,
            [saleId]: !prev[saleId],
        }))
    }

    return (
        <div className='sale_list_container'>
            <button
                className="icon_button create_button_sale"
                onClick={() => onAction('create')}
            >
                <FontAwesomeIcon icon={faCirclePlus} /> Create Sale
            </button>
            <div className="table_container">
                <table className="sale_table">
                    <thead className="sale_table_header">
                        <tr>
                            <th>Sale ID</th>
                            <th>Costumer</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="sale_table_body">
                        {sales.map((sale) => (
                            <React.Fragment key={sale._id}>
                                <tr onClick={() => toggleRow(sale._id)} style={{ cursor: 'pointer' }}>
                                    <td>
                                        <FontAwesomeIcon className='is_expanded' icon={expandedRows[sale._id] ? faChevronUp : faChevronDown} />
                                        {sale._id}
                                    </td>
                                    <td>{sale.customer?.username || 'N/A'}</td>
                                    <td>{sale.products ? sale.products.reduce((acc, item) => acc + item.quantity, 0) : 0}</td>
                                    <td>{sale.total_amount.toFixed(2)}</td>
                                    <td className='icon_container'>
                                        <button
                                            className="icon_button edit_button"
                                            onClick={(e) => { e.stopPropagation(); handleEdit(sale); }}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            className="icon_button delete_button"
                                            onClick={(e) => { e.stopPropagation(); handleDelete(sale._id); }}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                                {expandedRows[sale._id] && (
                                    <tr>
                                        <td colSpan="5">
                                            <table className="sale_product_table">
                                                <thead className='sale_product_table_header'>
                                                    <tr>
                                                        <th>Product ID</th>
                                                        <th>Product Name</th>
                                                        <th>Quantity</th>
                                                        <th>Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sale.products.map((productItem) => (
                                                        <tr key={productItem._id}>
                                                            <td>{productItem.product ? productItem.product._id : 'N/A'}</td>
                                                            <td>{productItem.product ? productItem.product.name : 'N/A'}</td>
                                                            <td>{productItem.quantity}</td>
                                                            <td>{productItem.price.toFixed(2)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
