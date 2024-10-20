import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { check_user_session } from './redux/thunks/login_thunk'
import { AppRouter } from './router'
import { Navbar } from './pages/'
import 'toastr/build/toastr.min.css'
import toastr from 'toastr'
import { fetch_products_thunk } from './redux/thunks/product_thunk'
import { fetch_categories_thunk } from './redux/thunks/category_thunk'
import { fetch_sales_thunk } from './redux/thunks/sale_thunk'

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
  const { products, is_loading } = useSelector((state) => state.product_slice)
  const { categories, is_loading_category } = useSelector((state) => state.category_slice)
  const { sales, is_loading_sale, sales_loaded } = useSelector((state) => state.sale_slice)
  const { is_authenticated, user } = useSelector((state) => state.login_slice)


  // useEffect para verificar la sesión del usuario
  useEffect(() => {
    if (!is_authenticated) {  // Solo lo ejecuta si no está autenticado
      dispatch(check_user_session())
    }
  }, [is_authenticated, dispatch])

  // useEffect para cargar productos
  useEffect(() => {
    if (!is_loading && products.length === 0) {
      dispatch(fetch_products_thunk())
    }
  }, [dispatch, products.length, is_loading])

  // useEffect para cargar categorías
  useEffect(() => {
    if (!is_loading_category && categories.length === 0) {
      dispatch(fetch_categories_thunk())
    }
  }, [dispatch, categories.length, is_loading_category])


  // useEffect para cargar ventas
  useEffect(() => {
    if (is_authenticated && user?.role === 'admin' && !sales_loaded) {
      if (!is_loading_sale) {
        dispatch(fetch_sales_thunk())
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