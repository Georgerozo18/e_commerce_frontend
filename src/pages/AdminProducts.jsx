import { PageTitle } from "../components/global/PageTitle"
import { PageContainer } from "../components/PageContainer"
import { ProductListTable } from "../components/products/ProductListTable"

export const AdminProducts = () => {
    return (
        <PageContainer
            className='page_container'
            background={'radial-gradient(circle, rgb(169 227 66) 30%, rgb(85 121 22) 100%)'}>
            <PageTitle title='Product List' />
            <ProductListTable />
        </PageContainer>
    )
}
