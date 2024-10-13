import { useState } from "react"
import { PageTitle } from "../components/global/PageTitle"
import { PageContainer } from "../components/PageContainer"
import { Create, Edit, ListTable } from "../components/products"
import { useDispatch, useSelector } from "react-redux"
import { set_current_view } from "../redux/slices"



export const AdminProducts = () => {
    const dispatch = useDispatch()
    const { current_view } = useSelector((state) => state.product_slice)

    const getTitle = () => {
        if (current_view === 'list') return 'Product List'
        if (current_view === 'create') return 'Create Product'
        if (current_view === 'edit') return 'Edit Product'
    }

    return (
        <PageContainer
            className='page_container'
            background={'radial-gradient(circle, rgb(169 227 66) 30%, rgb(85 121 22) 100%)'}>
            <PageTitle title={getTitle()} />
            {current_view === 'list' && <ListTable onAction={(view) => dispatch(set_current_view(view))} />}
            {current_view === 'create' && <Create onAction={(view) => dispatch(set_current_view(view))} />}
            {current_view === 'edit' && <Edit onAction={(view) => dispatch(set_current_view(view))} />}
        </PageContainer>
    )
}
