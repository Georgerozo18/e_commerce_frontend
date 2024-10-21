import { useDispatch, useSelector } from "react-redux"
import { PageTitle } from "../components/global/PageTitle"
import { PageContainer } from "../components/PageContainer"
import { set_current_category_view } from "../redux/slices"
import { Create, Edit, ListTable } from '../components/categories'

export const AdminCategories = () => {
    const dispatch = useDispatch()
    const { current_view } = useSelector((state) => state.category_slice)

    const getTitle = () => {
        if (current_view === 'list') return 'Category List'
        if (current_view === 'create') return 'Create Category'
        if (current_view === 'edit') return 'Edit Category'
    }

    return (
        <PageContainer
            className='page_container'
            background={'radial-gradient(circle, rgb(127, 255, 212) 30%, rgb(72 153 114) 100%)'}>
            <PageTitle title={getTitle()} />
            {current_view === 'list' && <ListTable onAction={(view) => dispatch(set_current_category_view(view))} />}
            {current_view === 'create' && <Create onAction={(view) => dispatch(set_current_category_view(view))} />}
            {current_view === 'edit' && <Edit onAction={(view) => dispatch(set_current_category_view(view))} />}
        </PageContainer>
    )
}
