import { useDispatch, useSelector } from "react-redux"
import { PageTitle } from "../components/global/PageTitle"
import { PageContainer } from "../components/PageContainer"
import { Create, Edit, ListTable } from '../components/sales'
import { set_current_sale_view } from "../redux/slices"

export const AdminSales = () => {
    const dispatch = useDispatch()
    const { current_view } = useSelector((state) => state.sale_slice)

    const getTitle = () => {
        if (current_view === 'list') return 'Sales List'
        if (current_view === 'create') return 'Create Sale'
        if (current_view === 'edit') return 'Edit Sale'
    }

    return (
        <PageContainer
            className='page_container'
            background={'radial-gradient(circle, rgb(200, 153, 255) 30%, rgb(100, 0, 150) 100%)'}>
            <PageTitle title={getTitle()} />
            {current_view === 'list' && <ListTable onAction={(view) => dispatch(set_current_sale_view(view))} />}
            {current_view === 'create' && <Create onAction={(view) => dispatch(set_current_sale_view(view))} />}
            {current_view === 'edit' && <Edit onAction={(view) => dispatch(set_current_sale_view(view))} />}
        </PageContainer>
    )
}
