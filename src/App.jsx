import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { check_user_session } from './redux/thunks/login_thunk'
import { AppRouter } from './router'
import { Navbar } from './pages/'
import 'toastr/build/toastr.min.css'
import toastr from 'toastr'
import { fetch_products_thunk } from './redux/thunks/product_thunk'
import { fetch_categories_thunk } from './redux/thunks/category_thunk'
import { fetch_sales_stats_thunk, fetch_sales_thunk } from './redux/thunks/sale_thunk'

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut'
}

export const App = () => {
  const dispatch = useDispatch()
  const { is_authenticated, user } = useSelector((state) => state.login_slice)

  const { is_loading_category, categories_loaded } = useSelector((state) => state.category_slice)
  const { is_loading, products_loaded } = useSelector((state) => state.product_slice)
  const { is_loading_sale, sales_loaded } = useSelector((state) => state.sale_slice)

  // useEffect para verificar la sesión del usuario
  useEffect(() => {
    if (!is_authenticated) {  // Solo lo ejecuta si no está autenticado
      dispatch(check_user_session())
    }
  }, [is_authenticated, dispatch])

  // useEffect para cargar categorías
  useEffect(() => {
    if (!categories_loaded) {
      if (!is_loading_category) {
        dispatch(fetch_categories_thunk())
      }
    }
  }, [dispatch, is_loading_category, categories_loaded])

  // useEffect para cargar productos
  useEffect(() => {
    if (!products_loaded) {
      if (!is_loading) {
        dispatch(fetch_products_thunk())
      }
    }
  }, [dispatch, is_loading, products_loaded])

  // useEffect para cargar ventas
  useEffect(() => {
    if (is_authenticated && user?.role === 'admin' && !sales_loaded) {
      if (!is_loading_sale) {
        dispatch(fetch_sales_thunk())
        dispatch(fetch_sales_stats_thunk())
      }
    }
  }, [dispatch, is_authenticated, user?.role, is_loading_sale, sales_loaded])

  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  )
}