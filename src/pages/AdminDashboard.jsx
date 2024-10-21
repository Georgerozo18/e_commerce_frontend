import { useSelector } from "react-redux"
import { PageContainer } from "../components/PageContainer"
import { ProfileTitle } from "../components/profile"
import { SalesChart } from "../components/sales/SalesChart"

export const AdminDashboard = () => {
    const { user } = useSelector(state => state.login_slice)
    const { sales_stats } = useSelector((state) => state.sale_slice)

    const salesDataArray = sales_stats && sales_stats.salesByDate
        ? Object.entries(sales_stats.salesByDate).map(([date, data]) => ({
            date,
            totalProductsSold: data.totalProductsSold || 0,
            totalRevenue: data.totalRevenue || 0,
            totalSales: data.totalSales || 0,
        }))
        : []; // Devuelve un array vacío si no hay datos

    return (
        <PageContainer
            className='page_container'
            background={'radial-gradient(circle, rgb(0 180 252) 30%, rgb(0 91 197) 100%)'}>
            <ProfileTitle user={user.fullname} />
            {salesDataArray.length > 0 && <SalesChart data={salesDataArray} />}
        </PageContainer>
    )
}
