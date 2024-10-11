import { useState } from "react"
import { PageTitle } from "../components/global/PageTitle"
import { PageContainer } from "../components/PageContainer"
import { Create, Edit, ListTable } from "../components/products"


export const AdminProducts = () => {
    const [view, setView] = useState('list')

    const handleViewChange = (newView) => {
        setView(newView)
    }

    const getTitle = () => {
        if (view === 'list') return 'Product List'
        if (view === 'create') return 'Create Product'
        if (view === 'edit') return 'Edit Product'
    }

    return (
        <PageContainer
            className='page_container'
            background={'radial-gradient(circle, rgb(169 227 66) 30%, rgb(85 121 22) 100%)'}>
            <PageTitle title={getTitle()} />
            {view === 'list' && <ListTable onAction={handleViewChange} />}
            {view === 'create' && <Create onAction={handleViewChange} />}
            {view === 'edit' && <Edit onAction={handleViewChange} />}
        </PageContainer>
    )
}
