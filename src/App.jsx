import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { check_user_session } from './redux/thunks/login_thunk'
import { AppRouter } from './router'
import { Navbar } from './pages/'
import { fetch_products_thunk } from './redux/thunks/product_thunk'
import { fetch_categories_thunk } from './redux/thunks/category_thunk'
import 'toastr/build/toastr.min.css'
import toastr from 'toastr'

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

  // useEffect para verificar la sesión del usuario
  useEffect(() => {
    dispatch(check_user_session())
  }, [dispatch])

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

  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  )
}